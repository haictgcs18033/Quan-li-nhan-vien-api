var Validation = function () {
    this.kiemTraRong = function (value, name, selectorError) {
        if (value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + " không được bỏ trống";
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraTatCaLaKiTu = function (value, name, selectorError) {
        regexKyTu = /^[A-Z a-z]+$/;
        if (!regexKyTu.test(value)) {
            document.querySelector(selectorError).innerHTML = name + " tất cả là ký tự";
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraLuongCoBan = function (value, name, selectorError, minValue, maxValue) {
        if (Number(value) < minValue || Number(value) > maxValue) {
            document.querySelector(selectorError).innerHTML = name + `phải từ ${minValue} - ${maxValue} đồng`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraGioLam = function (value, name, selectorError, minValue, maxValue) {
        if (Number(value) < minValue || Number(value) > maxValue) {
            document.querySelector(selectorError).innerHTML = name + `phải từ ${minValue}h đến ${maxValue}h`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraDoDaiChuoi = function (value, name, selectorError, minlength, maxlength) {
        if (value.trim().length < minlength || value.trim().length > maxlength) {
            document.querySelector(selectorError).innerHTML = name + ` độ dài ${minlength}-${maxlength} ký tự`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

}
