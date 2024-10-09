export const LOCALHOST = 'http://localhost:8080' //IP máy BE

export const MAPPING_URL = {
    PRODUCT: '/product',
    PRODUCT_DETAIL: '/product-detail',
    IMAGE: '/image',
    SIZE: '/size',
    COLOR: '/color',
    TYPE: '/type',
    BRAND: '/brand',
    CUSTOMER: '/customer',
    CART: '/cart',
    SHIPPING_ADDRESS: '/shipping-address',
    PAYMENT: '/payment',
}

export const API_URL = {
    PRODUCT: {
        FIND_ALL_PRODUCT: '',
        EDIT: '/edit',
        INSERT: '/insert',
        FIND_PRODUCT_BY_TYPE_ID: '/type'
    },
    PRODUCT_DETAIL: {
        FIND_ALL_PRODUCT_DETAIL: '',
        UPDATE_QR_CODE: '/update-qrcode',
        INSERT_PRODUCT_DETAIL: '/insert',
        UPDATE_PRODUCT_DETAIL: '/edit',
        FIND_PRODUCT_DETAIL_ADD_TO_CART: '/find-product-detail-to-cart',
        FIND_SIZES_ID_BY_COLOR_ID_IN_PRODUCT_DETAIL: '/find-sizes-by-color-in-product-detail',
    },
    IMAGE: {
        FIND_IMAGE_BY_PRODUCT_DETAIL_ID: '/product-detail',
        UPLOAD: '/upload-image-product-detail',
        FIND_IMAGE_BY_CUSTOMER_ID: '/customer',
        UPLOAD_IMG_CUSTOMER: '/upload-image-customer',
    },
    COLOR: {
        FIND_ALL_COLOR: '',
        EDIT: '/edit',
        INSERT: '/insert'
    },
    SIZE: {
        FIND_ALL_SIZE: '',
        EDIT: '/edit',
        INSERT: '/insert'
    },
    TYPE: {
        FIND_ALL_TYPE: '',
        EDIT: '/edit',
        INSERT: '/insert'
    },
    BRAND: {
        FIND_ALL_BRAND: '',
        EDIT: '/edit',
        INSERT: '/insert'
    },
    CUSTOMER: {
        FIND_ALL_CUSTOMER: '',
        EDIT: '/edit',
        EDIT_RESET_TOKEN_FOR_CUSTOMER: '/edit-reset-token-for-customer',
        INSERT: '/insert'
    },
    CART: {
        ADD_PRODUCT_DETAIL_TO_CART: '/add-product-to-cart',
        FIND_ALL_CART: '',
        UPDATE_PRODUCT_QUANTITY_IN_CART: '/update-quantity',
        DELETE_PRODUCT_QUANTITY_IN_CART: '/delete-product-detail-in-cart',
        COUNT: '/count'
    },
    SHIPPING_ADDRESS: {
        FIND_SHIPPING_ADDRESS_BY_CUSTOMER_ID: '/customer',
        FIND_ALL_SHIPPING_ADDRESS: '',
        EDIT: '/edit',
        INSERT: '/insert'
    },
    PAYMENT: {
        
    }
}