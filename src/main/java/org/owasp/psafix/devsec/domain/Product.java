package org.owasp.psafix.devsec.domain;

public class Product {
    private int id;
    private String libelle;
    private int prixUnitaire;

    public Product() {
    }

    public Product(int id, String libelle, int prixUnitaire) {
        this.id = id;
        this.libelle = libelle;
        this.prixUnitaire = prixUnitaire;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPrixUnitaire() {
        return prixUnitaire;
    }

    public void setPrixUnitaire(int prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

}
