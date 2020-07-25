package org.owasp.psafix.devsec.domain;

import java.util.List;

public class Order {
    List<PanierItem> items;
    int total;

    public List<PanierItem> getItems() {
        return items;
    }

    public void setItems(List<PanierItem> items) {
        this.items = items;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}
