package com.alten.producttrialmaster;

import com.alten.producttrialmaster.model.entity.Product;
import com.alten.producttrialmaster.repository.ProductRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
@RequiredArgsConstructor
@Component
public class ProductDataLoader implements CommandLineRunner {


    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws IOException {
        // Load JSON file from resources directory
        ObjectMapper objectMapper = new ObjectMapper();
        List<Product> products = objectMapper.readValue(
                Files.readString(Paths.get("src/main/resources/products.json")),
                objectMapper.getTypeFactory().constructCollectionType(List.class, Product.class)
        );
        System.out.println("Parsed products: " + products);
        // Save products to the database
        productRepository.saveAll(products);
    }
}
