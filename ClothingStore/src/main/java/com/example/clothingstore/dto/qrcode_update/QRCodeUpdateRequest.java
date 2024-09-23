package com.example.clothingstore.dto.qrcode_update;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QRCodeUpdateRequest {

    private Long id;

    private String qrcode;
}
