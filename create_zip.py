import os
import zipfile

# Nom du dossier et du zip
folder_name = "meubles_site"
zip_name = "meubles_site.zip"

# Structure du site
structure = {
    "index.html": "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Home</title></head><body><h1>Home Page</h1></body></html>",
    "salon.html": "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Salon</title></head><body><h1>Salon Page</h1></body></html>",
    "chambre.html": "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Chambre</title></head><body><h1>Chambre Page</h1></body></html>",
    "cuisine.html": "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Cuisine</title></head><body><h1>Cuisine Page</h1></body></html>",
    "jardin.html": "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Jardin</title></head><body><h1>Jardin Page</h1></body></html>",
    "decoration.html": "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Decoration</title></head><body><h1>Decoration Page</h1></body></html>",
    "panier.html": "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Cart</title></head><body><h1>Cart Page</h1></body></html>",
    "login.html": "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Login</title></head><body><h1>Login Page</h1></body></html>",
    "register.html": "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Register</title></head><body><h1>Register Page</h1></body></html>",
    "styles.css": "/* CSS placeholder */ body { font-family: sans-serif; }",
    "script.js": "// JS placeholder"
}

# Créer le dossier temporaire
os.makedirs(folder_name, exist_ok=True)
os.makedirs(os.path.join(folder_name, "images"), exist_ok=True)

# Créer les fichiers
for filename, content in structure.items():
    with open(os.path.join(folder_name, filename), "w", encoding="utf-8") as f:
        f.write(content)

# Créer le zip
with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(folder_name):
        for file in files:
            zipf.write(os.path.join(root, file), 
                       os.path.relpath(os.path.join(root, file), folder_name))

print(f"{zip_name} créé avec succès !")
