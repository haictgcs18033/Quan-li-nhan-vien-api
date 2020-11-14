var NhanVien = function(maNV,tenNV,heSoChucVu,luongCB,soGioLam,chucVu){
    this.maNhanVien= maNV,
    this.tenNhanVien= tenNV,
    this.heSoChucVu=heSoChucVu,
    this.luongCoBan= luongCB,
    this.soGioLamTrongThang= soGioLam,
    this.chucVu= chucVu,
    this.tinhTongLuong= function () {
        var tongLuong = this.luongCoBan * this.heSoChucVu;
    
        return tongLuong;
    },
    this.xeploai= function () {
        if (this.soGioLamTrongThang >= 120) {
                   return "Nhân viên xuất săc"
        }else if(this.soGioLamTrongThang>=100 && this.soGioLamTrongThang<120){
            return "Nhân viên giỏi"
        }else if(this.soGioLamTrongThang>=80 && this.soGioLamTrongThang<100){
            return "Nhân viên khá "
        }else if(this.soGioLamTrongThang>=50 && this.soGioLamTrongThang<80){
            return "Nhân viên trung bình"
        }else{
            return "Không xác định"
        }
    }
};