export const LOCALHOST = 'http://localhost:8080'

export const MAPPING_URL = {
    PRODUCT: '/product',
    PRODUCT_DETAIL: '/product-detail',
    IMAGE: '/image',
    SIZE: '/size',
    COLOR: '/color',
    TYPE: '/type',
    BRAND: '/brand',
    CUSTOMER: '/customer',
}

export const API_URL = {
    PRODUCT: {
        FIND_ALL_PRODUCT: '',
        EDIT: '/edit',
        INSERT: '/insert'
    },
    PRODUCT_DETAIL: {
        FIND_ALL_PRODUCT_DETAIL: '',
        UPDATE_QR_CODE: '/update-qrcode',
        INSERT_PRODUCT_DETAIL: '/insert',
        UPDATE_PRODUCT_DETAIL: '/edit'
    },
    IMAGE: {
        FIND_IMAGE_BY_PRODUCT_DETAIL_ID: '/product-detail',
        UPLOAD: '/upload',
        EDIT: '/edit'
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
        INSERT: '/insert'
    },
}