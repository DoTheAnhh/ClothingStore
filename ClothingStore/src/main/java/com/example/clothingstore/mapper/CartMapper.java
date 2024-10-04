package com.example.clothingstore.mapper;

import com.example.clothingstore.dto.cart.CartResponse;
import com.example.clothingstore.entity.Cart;
import com.example.clothingstore.entity.ProductDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface CartMapper {

    CartMapper INSTANCE = Mappers.getMapper(CartMapper.class);

    @Mapping(source = "voucher.voucherCode", target = "voucherCode")
    @Mapping(source = "productDetail.product.productName", target = "productName")
    @Mapping(source = "productDetail.productPrice", target = "productPrice")
    @Mapping(source = "productDetail.color.colorName", target = "colorName")
    @Mapping(source = "productDetail.size.sizeName", target = "sizeName")
    @Mapping(source = "productDetail", target = "imageUrl", qualifiedByName = "mapFirstImageUrl")
    CartResponse toDto(Cart cart);

    List<CartResponse> toDtoList(List<Cart> carts);

    @Named("mapFirstImageUrl")
    public static String mapFirstImageUrl(ProductDetail productDetail) {
        if (productDetail.getImages() != null && !productDetail.getImages().isEmpty()) {
            return productDetail.getImages().get(0).getImageUrl();
        }
        return null;
    }
}
