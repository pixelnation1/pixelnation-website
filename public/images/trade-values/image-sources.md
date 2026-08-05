# Trade Values product image sources

All product photos were downloaded from manufacturer press kits, official brand newsrooms,
or Wikimedia Commons studio/product photography, then optimized locally to WebP.
The live site serves only these local files (no hotlinking).

| Local file | Product | Original source |
|---|---|---|
| `ps5-disc.webp` | PlayStation 5 Disc Edition | Wikimedia Commons — [PlayStation 5 and DualSense with transparent background.png](https://commons.wikimedia.org/wiki/File:PlayStation_5_and_DualSense_with_transparent_background.png) |
| `ps5-digital.webp` | PlayStation 5 Digital Edition | Wikimedia Commons — [PS5DigitalEdition.png](https://commons.wikimedia.org/wiki/File:PS5DigitalEdition.png) |
| `xbox-series-x.webp` | Xbox Series X | Wikimedia Commons — [Xbox Series X.png](https://commons.wikimedia.org/wiki/File:Xbox_Series_X.png) |
| `xbox-series-s.webp` | Xbox Series S | Wikimedia Commons — [Xbox Series S with controller (transparent background).png](https://commons.wikimedia.org/wiki/File:Xbox_Series_S_with_controller_(transparent_background).png) |
| `nintendo-switch-oled.webp` | Nintendo Switch OLED | Wikimedia Commons — [Nintendo Switch – OLED-Modell…](https://commons.wikimedia.org/wiki/File:Nintendo_Switch_%E2%80%93_OLED-Modell-Konsole_20230506_HOF01643_RAW-Export.png) |
| `nintendo-switch-v2.webp` | Nintendo Switch (V2) docked set | Wikimedia Commons — [Nintendo-Switch-Console-Docked-wJoyConRB.jpg](https://commons.wikimedia.org/wiki/File:Nintendo-Switch-Console-Docked-wJoyConRB.jpg) (Evan-Amos studio) |
| `nintendo-switch-lite-blue.webp` | Nintendo Switch Lite | Wikimedia Commons — [Nintendo switch lite blue.jpg](https://commons.wikimedia.org/wiki/File:Nintendo_switch_lite_blue.jpg) |
| `steam-deck-lcd.webp` | Steam Deck LCD | Wikimedia Commons — [Steam Deck (front).png](https://commons.wikimedia.org/wiki/File:Steam_Deck_(front).png) |
| `steam-deck-oled.webp` | Steam Deck OLED | Valve Steam Deck OLED press kit — `press_front_home.png` via [steamdeck.com/en/press](https://www.steamdeck.com/en/press) / Valve Archive press kits |
| `rog-ally.webp` | ASUS ROG Ally | Official ASUS ROG product asset — [dlcdnwebimgs.asus.com … product_rog_nr2301.webp](https://rog.asus.com/us/gaming-handhelds/rog-ally/rog-ally-2023/) |
| `playstation-portal.webp` | PlayStation Portal | Wikimedia Commons — [PlayStation Portal.jpg](https://commons.wikimedia.org/wiki/File:PlayStation_Portal.jpg) (cleanest redistributable cut available; official Sony press preferred if a local kit is obtained later) |
| `dualsense-controller.webp` | DualSense Wireless Controller | Wikimedia Commons — [Playstation DualSense Controller.png](https://commons.wikimedia.org/wiki/File:Playstation_DualSense_Controller.png) |
| `ps4-pro.webp` | PlayStation 4 Pro | Wikimedia Commons — [Sony-PlayStation4-Pro-Console-FL.png](https://commons.wikimedia.org/wiki/File:Sony-PlayStation4-Pro-Console-FL.png) |
| `ps4-slim.webp` | PlayStation 4 Slim | Cropped from Wikimedia Commons — [PS4 consoles montage.png](https://commons.wikimedia.org/wiki/File:PS4_consoles_montage.png) (Slim panel) |
| `ps4-console.webp` | Original PS4 (unused alternate) | Wikimedia Commons — [PS4-Console-wDS4.png](https://commons.wikimedia.org/wiki/File:PS4-Console-wDS4.png) |
| `xbox-one-x.webp` | Xbox One X | Wikimedia Commons — [Microsoft-Xbox-One-X-Console-Set.jpg](https://commons.wikimedia.org/wiki/File:Microsoft-Xbox-One-X-Console-Set.jpg) |
| `xbox-one-s.webp` | Xbox One S | Wikimedia Commons — [Microsoft-Xbox-One-S-Console-wController-L.jpg](https://commons.wikimedia.org/wiki/File:Microsoft-Xbox-One-S-Console-wController-L.jpg) |
| `nintendo-64.webp` | Nintendo 64 Console | Wikimedia Commons — [N64-Console-Set.png](https://commons.wikimedia.org/wiki/File:N64-Console-Set.png) |
| `meta-quest-3.webp` | Meta Quest 3 | Official Meta newsroom asset — [Meta-Quest-3.png](https://about.fb.com/wp-content/uploads/2025/09/Meta-Quest-3.png) |
| `iphone-12.webp` | Apple iPhone 12 | Wikimedia Commons — [Iphone-12-product--red.png](https://commons.wikimedia.org/wiki/File:Iphone-12-product--red.png) |
| `ipad-9th-gen.webp` | Apple iPad 9th Generation | Wikimedia Commons — [IPad 9th Generation 2024.jpg](https://commons.wikimedia.org/wiki/File:IPad_9th_Generation_2024.jpg) |
| `windows-laptop.webp` | Generic Windows laptop | Wikimedia Commons — [Laptop computer.jpg](https://commons.wikimedia.org/wiki/File:Laptop_computer.jpg) |
| `psvr2.webp` | PlayStation VR2 | Wikimedia Commons — [PSVR2.png](https://commons.wikimedia.org/wiki/File:PSVR2.png) |
| `wifi-router.webp` | Consumer Wi-Fi router | Wikimedia Commons — [Google WiFi router.png](https://commons.wikimedia.org/wiki/File:Google_WiFi_router.png) |
| `device-placeholder.svg` | Neutral “Image coming soon” fallback | Local SVG (console icon). Not the PixelNation logo. |

## Processing

- Resized to fit a 1200×1200 canvas with `object-fit: contain` and a white background
- Encoded as WebP (~quality 82)
- Near-black letterboxing flattened to white where needed for consistent card framing
- Served only from `/public/images/trade-values/`
