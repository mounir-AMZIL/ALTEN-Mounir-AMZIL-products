package com.alten.producttrialmaster.mapper;

import com.alten.producttrialmaster.model.entity.Product;
import com.alten.producttrialmaster.model.vo.ProductVO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper( componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface ProductMapper {


    ProductVO toProductVO(Product product);
    Product toProduct(ProductVO productVO);
}
