# Guide d'installation — Configurateur 3D Kuztom sur Shopify

## Prérequis

- Accès à l'éditeur de thème Shopify (admin > En ligne > Thèmes > Modifier le code)
- Le fichier `configurateur-snippet.liquid` de ce dossier
- Un produit Shopify avec un metafield `custom.design_handle` renseigné

---

## Étape 1 — Ajouter le snippet au thème

1. Dans l'admin Shopify, aller dans **En ligne > Thèmes > Modifier le code**
2. Dans le dossier **Snippets**, cliquer sur **Ajouter un nouveau snippet**
3. Nommer le fichier : `configurateur-3d` (sans l'extension `.liquid`)
4. Coller le contenu du fichier `configurateur-snippet.liquid`
5. Cliquer sur **Enregistrer**

---

## Étape 2 — Inclure le snippet dans la page produit

1. Dans l'éditeur de code, ouvrir le fichier `sections/main-product.liquid`
   (ou `templates/product.liquid` selon le thème)
2. Trouver l'endroit où le formulaire `<form>` du produit se trouve
3. Juste avant le bouton "Ajouter au panier", ajouter :

```liquid
{% render 'configurateur-3d' %}
```

4. Enregistrer

---

## Étape 3 — Créer le metafield sur les produits

1. Dans l'admin Shopify, aller dans **Paramètres > Définitions de métachamps**
2. Choisir **Produits**
3. Cliquer sur **Ajouter une définition**
4. Remplir :
   - **Nom** : Handle du design
   - **Namespace et clé** : `custom.design_handle`
   - **Type** : Texte sur une ligne
5. Enregistrer

---

## Étape 4 — Associer un design à un produit

1. Aller sur la fiche du produit concerné dans l'admin Shopify
2. Faire défiler jusqu'à la section **Métachamps**
3. Dans le champ `custom.design_handle`, entrer la valeur du handle du design
   (exemple : `gobelet-mariage-eucalyptus`)
4. Enregistrer le produit

> Le handle correspond à la valeur `shopify_handle` exportée depuis l'admin de designs.

---

## Étape 5 — Vérifier le fonctionnement

1. Ouvrir la page produit sur la boutique
2. Le configurateur 3D doit s'afficher dans un iframe
3. Quand le client modifie un texte, une couleur ou uploade une photo,
   les champs cachés `properties[Texte personnalisé]`, `properties[Couleur gobelet]`
   et `properties[Photo]` sont mis à jour automatiquement
4. Ces propriétés apparaissent dans la commande Shopify après l'achat

---

## Dépannage

| Problème | Solution |
|---|---|
| Le configurateur ne s'affiche pas | Vérifier que le metafield `custom.design_handle` est bien renseigné sur le produit |
| Le handle ne correspond à aucun design | Vérifier la valeur dans l'admin de designs (champ "Handle Shopify") |
| Les propriétés n'apparaissent pas dans la commande | Vérifier que les `<input type="hidden">` sont bien à l'intérieur du `<form>` du produit |
| L'iframe ne charge pas | Vérifier que GitHub Pages est actif sur le dépôt `clcreation542-coder/Code-3D` |
