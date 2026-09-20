import urllib.request
import json
import os
from PIL import Image
import io

BASE_DIR = "/home/anwar/Projects/VAEL/public/assets/backgrounds"

assets_info = [
    {
        "id": "handmade-paper",
        "category": "ivory",
        "file_name": "handmade-paper.webp",
        "query": "handmade paper texture neutral",
        "unsplash_id": "1586075010923-2dd4570fb338", # Annie Spratt paper texture
        "alt": "Warm handmade paper texture with natural subtle grain",
        "license": "Unsplash License (Free commercial & non-commercial use)",
        "sourceUrl": "https://unsplash.com/photos/1586075010923-2dd4570fb338",
        "author": "Annie Spratt",
        "authorUrl": "https://unsplash.com/@anniespratt"
    },
    {
        "id": "linen-window-shadow",
        "category": "ivory",
        "file_name": "linen-window-shadow.webp",
        "query": "natural linen shadow texture",
        "unsplash_id": "1596178065887-1198b6148b2b", # Linen shadow texture
        "alt": "Soft window shadow across warm ivory linen fabric",
        "license": "Unsplash License (Free commercial & non-commercial use)",
        "sourceUrl": "https://unsplash.com/photos/1596178065887-1198b6148b2b",
        "author": "Smit Patel",
        "authorUrl": "https://unsplash.com/@smitpatel"
    },
    {
        "id": "pearl-paper",
        "category": "ivory",
        "file_name": "pearl-paper.webp",
        "query": "white textured paper background",
        "unsplash_id": "1607604276583-eef5d076aa5f",
        "alt": "Smooth cream pearl paper texture with luminous surface",
        "license": "Unsplash License (Free commercial & non-commercial use)",
        "sourceUrl": "https://unsplash.com/photos/1607604276583-eef5d076aa5f",
        "author": "Ksenia Chernaya",
        "authorUrl": "https://unsplash.com/@ksenia_chernaya"
    },
    {
        "id": "black-velvet",
        "category": "noir",
        "file_name": "black-velvet.webp",
        "query": "dark black velvet texture",
        "unsplash_id": "1618005182384-a83a8bd57fbe", # Dark velvet/silk texture
        "alt": "Deep black velvet texture with subtle light folds",
        "license": "Unsplash License (Free commercial & non-commercial use)",
        "sourceUrl": "https://unsplash.com/photos/1618005182384-a83a8bd57fbe",
        "author": "Milad Fakurian",
        "authorUrl": "https://unsplash.com/@fakurian"
    },
    {
        "id": "obsidian-stone",
        "category": "noir",
        "file_name": "obsidian-stone.webp",
        "query": "dark charcoal stone texture",
        "unsplash_id": "1600585154340-be6161a56a0c",
        "alt": "Charcoal obsidian stone background with rich dark grain",
        "license": "Unsplash License (Free commercial & non-commercial use)",
        "sourceUrl": "https://unsplash.com/photos/1600585154340-be6161a56a0c",
        "author": "Ruan Richard",
        "authorUrl": "https://unsplash.com/@ruanrichard"
    },
    {
        "id": "persian-rug",
        "category": "oud",
        "file_name": "persian-rug.webp",
        "query": "oriental rug texture carpet top view",
        "unsplash_id": "1600121848594-d8644e57abab",
        "alt": "Muted antique Persian rug texture with delicate woven motifs",
        "license": "Unsplash License (Free commercial & non-commercial use)",
        "sourceUrl": "https://unsplash.com/photos/1600121848594-d8644e57abab",
        "author": "Aishath Naj",
        "authorUrl": "https://unsplash.com/@aishathnaj"
    },
    {
        "id": "sandstone-arch",
        "category": "oud",
        "file_name": "sandstone-arch.webp",
        "query": "warm sandstone plaster wall texture",
        "unsplash_id": "1513694203232-719a280e022f",
        "alt": "Warm sandstone arch texture with gentle architectural shadow",
        "license": "Unsplash License (Free commercial & non-commercial use)",
        "sourceUrl": "https://unsplash.com/photos/1513694203232-719a280e022f",
        "author": "Robby McCullough",
        "authorUrl": "https://unsplash.com/@robbymccullough"
    },
    {
        "id": "palm-house",
        "category": "premium",
        "file_name": "palm-house.webp",
        "query": "palm leaf shadow on wall texture",
        "unsplash_id": "1579783902614-a3fb3927b675",
        "alt": "Warm plaster wall with soft botanical palm leaf shadows",
        "license": "Unsplash License (Free commercial & non-commercial use)",
        "sourceUrl": "https://unsplash.com/photos/1579783902614-a3fb3927b675",
        "author": "Birmingham Museums Trust",
        "authorUrl": "https://unsplash.com/@birminghammuseumstrust"
    },
    {
        "id": "velvet-archive",
        "category": "premium",
        "file_name": "velvet-archive.webp",
        "query": "dark red burgundy velvet texture",
        "unsplash_id": "1544816155-12df9643f363",
        "alt": "Burgundy velvet antique textile with deep crimson folds",
        "license": "Unsplash License (Free commercial & non-commercial use)",
        "sourceUrl": "https://unsplash.com/photos/1544816155-12df9643f363",
        "author": "Evie S.",
        "authorUrl": "https://unsplash.com/@evieshaffer"
    },
    {
        "id": "midnight-fabric",
        "category": "premium",
        "file_name": "midnight-fabric.webp",
        "query": "dark blue night sky fabric texture",
        "unsplash_id": "1534447677768-be436bb09401",
        "alt": "Midnight blue celestial fabric with subtle starlight texture",
        "license": "Unsplash License (Free commercial & non-commercial use)",
        "sourceUrl": "https://unsplash.com/photos/1534447677768-be436bb09401",
        "author": "Eberhard Grossgasteiger",
        "authorUrl": "https://unsplash.com/@eberhardgross"
    },
    {
        "id": "azure-silk",
        "category": "premium",
        "file_name": "azure-silk.webp",
        "query": "blue silk fabric folds texture",
        "unsplash_id": "1528459801416-a9e53bbf4e17",
        "alt": "Deep blue silk folds with soft directional ambient light",
        "license": "Unsplash License (Free commercial & non-commercial use)",
        "sourceUrl": "https://unsplash.com/photos/1528459801416-a9e53bbf4e17",
        "author": "Tim Mossholder",
        "authorUrl": "https://unsplash.com/@timmossholder"
    }
]

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

sources_data = {}

for item in assets_info:
    cat_dir = os.path.join(BASE_DIR, item["category"])
    os.makedirs(cat_dir, exist_ok=True)
    out_path = os.path.join(cat_dir, item["file_name"])
    
    if item["category"] not in sources_data:
        sources_data[item["category"]] = []
        
    rel_path = f"/assets/backgrounds/{item['category']}/{item['file_name']}"
    
    sources_data[item["category"]].append({
        "id": item["id"],
        "src": rel_path,
        "alt": item["alt"],
        "license": item["license"],
        "sourceUrl": item["sourceUrl"],
        "author": item["author"],
        "authorUrl": item["authorUrl"]
    })

    if os.path.exists(out_path) and os.path.getsize(out_path) > 10000 and not out_path.endswith('sandstone-arch.webp'):
        print(f"Already exists & valid: {out_path}")
        continue
        
    print(f"Downloading {item['id']} from Unsplash photo ID {item['unsplash_id']}...")
    
    # Try direct unsplash image download URL
    img_url = f"https://images.unsplash.com/photo-{item['unsplash_id']}?auto=format&fit=crop&w=1600&q=85"
    
    try:
        req = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            img = Image.open(io.BytesIO(data))
            
            # Convert RGBA/P to RGB if saving webp
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
                
            # Resize if width > 1600
            if img.width > 1600:
                h = int(img.height * (1600 / img.width))
                img = img.resize((1600, h), Image.Resampling.LANCZOS)
                
            img.save(out_path, "WEBP", quality=82)
            print(f"Successfully saved {out_path} ({os.path.getsize(out_path)} bytes)")
    except Exception as e:
        print(f"Error downloading {item['id']}: {e}")
        # Fallback: search unsplash source or alternative high quality source
        fallback_url = f"https://source.unsplash.com/featured/1600x1200/?{urllib.parse.quote(item['query'])}"
        try:
            req = urllib.request.Request(fallback_url, headers=headers)
            with urllib.request.urlopen(req) as resp:
                data = resp.read()
                img = Image.open(io.BytesIO(data))
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                img.save(out_path, "WEBP", quality=82)
                print(f"Fallback saved {out_path}")
        except Exception as e2:
            print(f"Fallback error for {item['id']}: {e2}")

# Write sources.json
sources_json_path = os.path.join(BASE_DIR, "sources.json")
with open(sources_json_path, "w", encoding="utf-8") as f:
    json.dump(sources_data, f, indent=2)

print("sources.json generated successfully!")
