# PixelNation shop launch

The storefront contains nine confirmed $34.99 designs and all ten approved studio-background images. It is not a live commerce integration yet. Product pages fail closed with a contact link until verified Square-hosted links are configured.

## Square setup still required

Create one catalog item per design (see lib/shop/products.ts). Create distinct ready-made and made-to-order variations where needed. Track actual stock only for ready-made stock; never invent quantities. Configure made-to-order production as 3–5 calendar days. Confirm colors and card capacity with the owner before publishing those specifications.

Create item-based Square checkout links (not custom-amount links), and verify each link supports its selected fulfillment method. Configure shipping charges, taxes, pickup instructions, confirmation messaging, and sold-out behavior in Square. If the checkout link cannot enforce the inventory/fulfillment requirements, do not enable that option; use Square Online or implement a reservation-backed Orders API flow instead.

Set server environment SQUARE_SHOP_LINKS_JSON to a JSON object keyed by product slug. Allowed optional properties: readyShipping, readyPickup, madeShipping, madePickup. Values must be HTTPS URLs hosted on square.link or checkout.square.site. Set SQUARE_SHOP_ENABLED=true only after testing. There is deliberately no stock-count claim or inventory synchronization in the storefront; availability and prices must be verified at Square checkout. Until then it is a reviewable storefront, not a completed payment integration.

## Launch verification

Verify all prices ($34.99), design names, exact colors, and images. Test pickup and shipping separately. Verify Square order, receipt, taxes, shipping charge, fulfillment instructions, and ready-made inventory reduction. Test sold-out products, canceled checkout, mobile navigation, and all product links. Check that made-to-order sales do not decrement ready-made inventory. Keep live checkout disabled until these pass.
