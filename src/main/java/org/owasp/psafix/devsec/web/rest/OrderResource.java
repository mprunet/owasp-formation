package org.owasp.psafix.devsec.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import org.owasp.psafix.devsec.domain.Order;
import org.owasp.psafix.devsec.domain.PanierItem;
import org.owasp.psafix.devsec.domain.Product;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class OrderResource {
    @Value("${jhipster.clientApp.name}")
    private String applicationName;


    Map<Integer, Product> products = new HashMap<>();
    public OrderResource() {
        products.put(1, new Product(1, "Galaxy S20+", 699));
        products.put(2, new Product(2, "Oreillette Bluetooth", 50));
    }

    @PostMapping("/order/order")
    public Order order(@Valid @RequestBody List<PanierItem> items) {
        Order order = new Order();
        int total = items.stream().map(i->i.getProduct().getPrixUnitaire() * i.getQuantite()).reduce(0, Integer::sum);
        order.setTotal(total);
        order.setItems(items);
        return order;
    }

    @PostMapping("/order/placeOrder")
    public ResponseEntity<Order> order(@Valid @RequestBody Order order) {
        return ResponseEntity.ok()
            .headers(HeaderUtil.createAlert(applicationName, "Votre commande d'un montant de " + order.getTotal() + " a été effectuée", ""))
            .body(order);
    }

    @GetMapping("/order/products")
    public Collection<Product> products() {
        return products.values();
    }

}
