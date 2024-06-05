package com.dreamcraze.dreamcraze.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

// import com.dreamcraze.dreamcraze.exception.ApiRequestException;
import com.dreamcraze.dreamcraze.model.OrderItem;
import com.dreamcraze.dreamcraze.model.Product;
import com.dreamcraze.dreamcraze.request.DiscountRequest;
import com.dreamcraze.dreamcraze.request.ProductPageRequest;
import com.dreamcraze.dreamcraze.request.ProductRequest;
import com.dreamcraze.dreamcraze.response.ProductPageResponse;
import com.dreamcraze.dreamcraze.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/getOneProduct")
    public OrderItem getAllProducts() {
        return productService.getOneProduct();
    }

    @Autowired
    private RestTemplate restTemplate;

    @Value("http://localhost:8086/discountapi/all")
    private String discountServiceUrl;

    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<Product>> getProductsByCategoryName(
            @PathVariable(required = false) String categoryName) {
        try {
            DiscountRequest[] discounts = restTemplate.getForObject(discountServiceUrl, DiscountRequest[].class);
            List<Product> products = productService.findAllByCategoryName(categoryName);
            return ResponseEntity.ok().body(productService.applyDiscounts(products, Arrays.asList(discounts)));
        } catch (RestClientException e) {
            List<Product> products = productService.findAllByCategoryName(categoryName);
            return ResponseEntity.ok().body(products);
        }
    }

    @GetMapping("/page")
    public ResponseEntity<ProductPageResponse> getProductWithPage(@ModelAttribute ProductPageRequest pageRequest) {
        ProductPageResponse productResponse = productService.getAllProductPerPage(pageRequest);
        return new ResponseEntity<ProductPageResponse>(productResponse, HttpStatus.FOUND);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProduct() {
        try {
            DiscountRequest[] discounts = restTemplate.getForObject(discountServiceUrl, DiscountRequest[].class);
            List<Product> productResponse = productService.getAllProduct();
            return ResponseEntity.ok().body(productService.applyDiscounts(productResponse, Arrays.asList(discounts)));
        } catch (RestClientException e) {
            List<Product> productResponse = productService.getAllProduct();
            return ResponseEntity.ok().body(productResponse);
        }
    }

    @GetMapping("/productDetails/{id}")
    public ResponseEntity<List<Product>> getProductsByDescription(@PathVariable int id) {
        try {
            DiscountRequest[] discounts = restTemplate.getForObject(discountServiceUrl, DiscountRequest[].class);
            Product product = productService.getOneProduct(id);
            return ResponseEntity.ok()
                    .body(productService.applyDiscounts(Arrays.asList(product), Arrays.asList(discounts)));
        } catch (RestClientException e) {
            Product productResponse = productService.getOneProduct(id);
            return ResponseEntity.ok().body(Arrays.asList(productResponse));
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> CreateNewProduct(@Valid @RequestBody ProductRequest productData, BindingResult result) {
        Map<String, String> productRespons = productService.saveProduct(productData);
        return ResponseEntity.ok().body(productRespons);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<Map<String, String>> deleteProduct(@PathVariable int id) {
        return ResponseEntity.ok().body(productService.deleteProduct(id));
    }

    @PutMapping("/update")
    public ResponseEntity<Map<String, String>> updateProduct(@Valid @RequestBody ProductRequest updatedProductData) {
        return ResponseEntity.ok().body(productService.updateProduct(updatedProductData));
    }

}
