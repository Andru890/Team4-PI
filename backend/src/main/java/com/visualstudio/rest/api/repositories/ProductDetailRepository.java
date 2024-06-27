package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long> {
    List<ProductDetail> findByIdIn(Set<Long> existingCharacteristicIds);

    //@Query(value = "select * from products_detail pd where product_id = ?1", nativeQuery = true)
    //@Query("select pd from ProductDetail pd where pd.product =?1")
    //List<ProductDetail> findByProductId(Long productId);
}
