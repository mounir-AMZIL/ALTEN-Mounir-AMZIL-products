package com.alten.producttrialmaster.exception;

public class ProductNotFoundException extends RuntimeException {
    public static final String MESSAGE="Product not found with id [%s]";
    public ProductNotFoundException(String id) {
        super(String.format(MESSAGE,id));
    }
}