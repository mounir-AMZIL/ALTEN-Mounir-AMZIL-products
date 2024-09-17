package com.alten.producttrialmaster.controller;
import com.alten.producttrialmaster.exception.ProductNotFoundException;
import com.alten.producttrialmaster.mapper.ProductMapper;
import com.alten.producttrialmaster.model.entity.Product;
import com.alten.producttrialmaster.model.vo.ProductVO;
import com.alten.producttrialmaster.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    private final ProductService productService;
    private final ProductMapper productMapper;

    // POST /products - Create a new product
    @Operation(summary = "Create a new product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Product created"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public ResponseEntity<ProductVO> createProduct(@RequestBody ProductVO productVO) {
        Product product = productMapper.toProduct(productVO);
        Product createdProduct = productService.saveProduct(product);
        ProductVO createdProductVO = productMapper.toProductVO(createdProduct);
        return new ResponseEntity<>(createdProductVO, HttpStatus.CREATED);
    }

    // GET /products - Retrieve all products
    @Operation(summary = "Get all products", description = "Retrieve a list of all products.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the list of products"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping
    public ResponseEntity<List<ProductVO>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        List<ProductVO> productVOs = products.stream()
                .map(productMapper::toProductVO)
                .collect(Collectors.toList());

        return new ResponseEntity<>(productVOs, HttpStatus.OK);
    }

    // GET /products/{id} - Retrieve details for a specific product
    @Operation(summary = "Retrieve details for a specific product by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the product"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ProductVO> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(p -> new ResponseEntity<>(productMapper.toProductVO(p), HttpStatus.OK))
                .orElseThrow(() -> new ProductNotFoundException(id+""));
    }

    // PATCH /products/{id} - Update details of a specific product
    @Operation(summary = "Update an existing product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product updated"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @PatchMapping("/{id}")
    public ResponseEntity<ProductVO> updateProduct(@PathVariable Long id, @RequestBody ProductVO updatedProductVO) {
            Product updatedProduct = productMapper.toProduct(updatedProductVO);
            Product product = productService.updateProduct(id, updatedProduct);
            return new ResponseEntity<>(productMapper.toProductVO(product), HttpStatus.OK);
    }



    // DELETE /products/{id} - Remove a specific product
    @Operation(summary = "Delete a product by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Product deleted"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
            productService.deleteProduct(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
