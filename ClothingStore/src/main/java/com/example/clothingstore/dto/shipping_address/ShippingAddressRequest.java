package com.example.clothingstore.dto.shipping_address;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShippingAddressRequest {
    private String userName;
    private String phoneNumber;
    private String provinceName;
    private String districtName;
    private String wardName;
    private String addressDetail;
    private Long customerId;
}
