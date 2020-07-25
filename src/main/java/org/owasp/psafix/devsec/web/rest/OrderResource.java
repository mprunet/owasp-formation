package org.owasp.psafix.devsec.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import org.owasp.psafix.devsec.domain.Order;
import org.owasp.psafix.devsec.domain.PanierItem;
import org.owasp.psafix.devsec.domain.Product;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

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

    private Order emptyOrder() {
        Order order = new Order();
        List<PanierItem> items = products.values().stream().map(p->new PanierItem().product(p)).collect(Collectors.toList());
        order.setItems(items);
        return order;
    }

    @PostMapping("/order/save")
    public ResponseEntity<Order> save(@Valid @RequestBody List<PanierItem> items, HttpServletResponse response) throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(bos);
        oos.writeObject(items);
        oos.flush();
        Cookie cookie = new Cookie("panier", Base64Utils.encodeToUrlSafeString(bos.toByteArray()));
        cookie.setMaxAge(31 * 24 * 60 * 60);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createAlert(applicationName, "Votre panier a été enregistré", ""))
            .body(emptyOrder());
    }

    @PostMapping("/order/restore")
    public ResponseEntity<Order> restore(HttpServletRequest request) throws Exception {
        for (Cookie c : request.getCookies()) {
            if ("panier".equals(c.getName())) {
                ByteArrayInputStream bis = new ByteArrayInputStream(Base64Utils.decodeFromUrlSafeString(c.getValue()));
                ObjectInputStream ois = new ObjectInputStream(bis);
                List<PanierItem> items = (List<PanierItem>)ois.readObject();
                return ResponseEntity.ok()
                    .body(order(items));
            }
        }
        List<PanierItem> items = new ArrayList<>();
        products.values().stream().map(p->items.add(new PanierItem().product(p)));
        return ResponseEntity.ok()
            .headers(HeaderUtil.createAlert(applicationName, "Votre panier sauvegardé est vide", ""))
            .body(emptyOrder());
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
            .headers(HeaderUtil.createAlert(applicationName, "Votre commande d'un montant de " + order.getTotal() + " Euros a été effectuée", ""))
            .body(order);
    }

    @GetMapping("/order/products")
    public Collection<Product> products() {
        return products.values();
    }

}
