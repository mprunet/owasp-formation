package org.owasp.psafix.devsec.domain;


import java.io.Serializable;

public class PanierItem implements Serializable {
    private Product product;

    public PanierItem product(Product product) {
        this.product = product;
        return this;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }

    private int quantite;
}
