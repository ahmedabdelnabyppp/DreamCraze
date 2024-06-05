package com.dreamcraze.dreamcraze.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.dreamcraze.dreamcraze.exception.ApiRequestException;
import com.dreamcraze.dreamcraze.model.Category;
import com.dreamcraze.dreamcraze.model.Order;
import com.dreamcraze.dreamcraze.model.OrderItem;
import com.dreamcraze.dreamcraze.model.Product;
import com.dreamcraze.dreamcraze.model.User;
import com.dreamcraze.dreamcraze.repository.CategoryRepository;
import com.dreamcraze.dreamcraze.repository.OrderItemRepository;
import com.dreamcraze.dreamcraze.repository.OrderRepository;
import com.dreamcraze.dreamcraze.repository.ProductRepository;
import com.dreamcraze.dreamcraze.repository.UserRepository;
import com.dreamcraze.dreamcraze.request.DiscountRequest;
import com.dreamcraze.dreamcraze.request.ProductPageRequest;
import com.dreamcraze.dreamcraze.request.ProductRequest;
import com.dreamcraze.dreamcraze.response.ProductPageResponse;

import jakarta.transaction.Transactional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public Map<String, String> saveProduct(ProductRequest productData) {
        Map<String, String> response = new HashMap<>();
        Product newProduct = new Product();
        newProduct = createNewProduct(productData);
        if (newProduct != null) {
            productRepository.save(newProduct);
            response.put("status", "success");
            response.put("message", "Product create successfully");
        } else {
            throw new ApiRequestException("The product Not create");
        }
        return response;

    }

    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    public ProductPageResponse getAllProductPerPage(ProductPageRequest pageRequest) {
        Sort sortByAndOrder = pageRequest.getSortOrder().equalsIgnoreCase("asc")
                ? Sort.by(pageRequest.getSortBy()).ascending()
                : Sort.by(pageRequest.getSortBy()).descending();
        Pageable pageDetails = PageRequest.of(
                pageRequest.getPageNumber(),
                pageRequest.getPageSize(),
                sortByAndOrder);
        Page<Product> pageProducts = productRepository.findAll(pageDetails);
        List<Product> products = pageProducts.getContent();
        ProductPageResponse productResponse = new ProductPageResponse();
        productResponse.setContent(products);
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setLastPage(pageProducts.isLast());
        return productResponse;
    }

    @SuppressWarnings("null")
    public OrderItem getOneProduct() {
        Product product = productRepository.findById(18);
        if (product == null) {
            throw new IllegalArgumentException("Product with ID 18 not found");
        }
        User user = userRepository.findById(3);
        Order order = Order.builder()
                .user(user)
                .totalAmount(20000F)
                .build();

        orderRepository.save(order);

        OrderItem orderItem = new OrderItem();
        orderItem.setProduct(product);
        orderItem.setQuantity(2);
        orderItem.setUnitPrice(10);
        orderItem.setOrder(order);

        OrderItem savedOrderItem = orderItemRepository.save(orderItem);
        return savedOrderItem;
    }

    public List<Product> findAllByCategoryName(String categoryName) {
        if (!categoryName.equals("")) {
            return productRepository.findAllByCategoryName(categoryName);
        } else {
            return null;
        }
    }

    public List<Product> findFourRecordProduct() {
        Pageable findWithFourRecord = PageRequest.of(0, 4);
        List<Product> product = productRepository.findByProductNameLike("laptop", findWithFourRecord).getContent();
        return product;
    }

    public Product getOneProduct(int id) {
        Product product = productRepository.findById(id);
        return product;
    }

    private Product createNewProduct(ProductRequest productData) {
        int categoryId = Integer.parseInt(productData.getCategory());

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Category with ID " + productData.getCategory() + " not found."));
        Product newProduct = new Product();
        newProduct.setName(productData.getName());
        newProduct.setDescription(productData.getDescription());
        newProduct.setBrand(productData.getBrand());
        newProduct.setPrice((float) productData.getPrice());
        newProduct.setImage(productData.getImage());
        newProduct.setQuantity(productData.getQuantity());
        newProduct.setRate((float) productData.getRate());
        newProduct.setCategory(category);
        return newProduct;
    }

    public Map<String, String> deleteProduct(int productId) {
        Map<String, String> response = new HashMap<>();
        Product productDetails = productRepository.findById(productId);
        if (productDetails != null) {
            productRepository.deleteById(productId);
            response.put("status", "success");
            response.put("message", "Product deleted successfully");
        } else {
            throw new ApiRequestException("The product Not found");
        }
        return response;
    }




    @Transactional
    public Map<String, String> updateProduct( ProductRequest updatedProductData) {
        Map<String, String> response = new HashMap<>();
        Category category = getCategoryById(updatedProductData.getCategory());
        Product existingProduct = getProductById(updatedProductData.getId());
        if (existingProduct != null) {
            updateProductDetails(existingProduct, updatedProductData, category);
            productRepository.save(existingProduct);
            response.put("status", "success");
            response.put("message", "Product updated successfully");
        } else {
            throw new ApiRequestException("The product with ID " + updatedProductData.getId() + " not found");
        }
        return response;
    }
    

    private Category getCategoryById(String categoryId) {
        int id = Integer.parseInt(categoryId);
        return categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Category with ID " + categoryId + " not found."));
    }
    

    private Product getProductById(int productId) {
        return productRepository.findById(productId);
    }
    

    private void updateProductDetails(Product existingProduct, ProductRequest updatedProductData, Category category) {
        existingProduct.setName(updatedProductData.getName());
        existingProduct.setPrice(updatedProductData.getPrice());
        existingProduct.setDescription(updatedProductData.getDescription());
        existingProduct.setImage(updatedProductData.getImage());
        existingProduct.setRate(updatedProductData.getRate());
        existingProduct.setBrand(updatedProductData.getBrand());
        existingProduct.setQuantity(updatedProductData.getQuantity());
        existingProduct.setCategory(category);
    }
     
    public List<Product> applyDiscounts(List<Product> products, List<DiscountRequest> discounts) {
        return products.stream()
                .map(product -> {
                    DiscountRequest discount = findDiscountByName(discounts, product.getDiscount());
                    if (discount != null) {
                        float discountedPrice = calculateDiscountedPrice(product.getPrice(), discount.getDiscountValue());
                        product.setOfferPrice(discountedPrice);
                    }
                    return product;
                })
                .collect(Collectors.toList());
    }

    private DiscountRequest findDiscountByName(List<DiscountRequest> discounts, String discountName) {
        return discounts.stream()
                .filter(discount -> discount.getName().equals(discountName))
                .findFirst()
                .orElse(null);
    }

    private float calculateDiscountedPrice(float originalPrice, float discountValue) {
        float discountAmount = (originalPrice) - (discountValue);
        return discountAmount;
    }
}
