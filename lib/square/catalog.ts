import "server-only";
import type { SquareClient } from "square";
import type { Square } from "square";

export type CatalogCategoryRef = {
  categoryId: string;
  categoryName: string;
};

type CacheEntry = CatalogCategoryRef | null;

function isCatalogItem(
  object: Square.CatalogObject,
): object is Square.CatalogObject.Item {
  return object.type === "ITEM";
}

function isCatalogItemVariation(
  object: Square.CatalogObject,
): object is Square.CatalogObject.ItemVariation {
  return object.type === "ITEM_VARIATION";
}

function isCatalogCategory(
  object: Square.CatalogObject,
): object is Square.CatalogObject.Category {
  return object.type === "CATEGORY";
}

/**
 * Resolve Square CatalogItemVariation → parent ITEM reporting/primary category.
 * Category is not on webhook payloads; must be fetched via Catalog API.
 */
export class CatalogCategoryResolver {
  private readonly cache = new Map<string, CacheEntry>();

  constructor(private readonly client: SquareClient) {}

  async resolve(
    catalogObjectId: string | null | undefined,
    catalogVersion?: bigint | number | null,
  ): Promise<CatalogCategoryRef | null> {
    if (!catalogObjectId) return null;
    const cached = this.cache.get(catalogObjectId);
    if (cached !== undefined) return cached;

    const resolved = await this.fetchCategory(catalogObjectId, catalogVersion);
    this.cache.set(catalogObjectId, resolved);
    return resolved;
  }

  private async fetchCategory(
    catalogObjectId: string,
    catalogVersion?: bigint | number | null,
  ): Promise<CatalogCategoryRef | null> {
    try {
      const response = await this.client.catalog.object.get({
        objectId: catalogObjectId,
        includeRelatedObjects: true,
        ...(catalogVersion != null
          ? { catalogVersion: BigInt(catalogVersion) }
          : {}),
      });

      const object = response.object;
      if (!object) return null;

      const item = this.findParentItem(object, response.relatedObjects ?? []);
      if (!item) return null;

      const categoryId =
        item.reportingCategory?.id ??
        item.categories?.[0]?.id ??
        item.categoryId ??
        null;
      if (!categoryId) return null;

      const categoryName =
        (await this.resolveCategoryName(
          categoryId,
          response.relatedObjects ?? [],
          catalogVersion,
        )) ?? "";

      return { categoryId, categoryName };
    } catch {
      return null;
    }
  }

  private findParentItem(
    object: Square.CatalogObject,
    related: Square.CatalogObject[],
  ): Square.CatalogItem | null {
    if (isCatalogItem(object) && object.itemData) {
      return object.itemData;
    }

    if (isCatalogItemVariation(object)) {
      const itemId = object.itemVariationData?.itemId;
      if (!itemId) return null;
      const parent = related.find(
        (obj): obj is Square.CatalogObject.Item =>
          isCatalogItem(obj) && obj.id === itemId,
      );
      return parent?.itemData ?? null;
    }

    return null;
  }

  private async resolveCategoryName(
    categoryId: string,
    related: Square.CatalogObject[],
    catalogVersion?: bigint | number | null,
  ): Promise<string | null> {
    const fromRelated = related.find(
      (obj): obj is Square.CatalogObject.Category =>
        isCatalogCategory(obj) && obj.id === categoryId,
    );
    if (fromRelated?.categoryData?.name) {
      return fromRelated.categoryData.name;
    }

    try {
      const response = await this.client.catalog.object.get({
        objectId: categoryId,
        ...(catalogVersion != null
          ? { catalogVersion: BigInt(catalogVersion) }
          : {}),
      });
      const object = response.object;
      if (object && isCatalogCategory(object)) {
        return object.categoryData?.name ?? null;
      }
      return null;
    } catch {
      return null;
    }
  }
}
