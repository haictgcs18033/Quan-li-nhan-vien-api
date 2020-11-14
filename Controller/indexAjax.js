var nvService = new NhanVienService();
var validate = new Validation();
var layDanhSachNhanVienApi = function () {
    var promise = nvService.layDanhSachNhanVien();  // Goi den backend lay data
    // Xu li cho truong hop thanh cong
    promise.then(function (result) {
        console.log("Ket qua", result.data);
        // Lay du lieu server tra ve goi ham tao table
        renderTable(result.data);
    });
    // Xu li cho truong hop that bai
    promise.catch(function (error) {
        console.log(error);
    })
}
var renderTable = function (mangNhanVien) {
    var noiDungTable = '';
    for (var i = 0; i < mangNhanVien.length; i++) {
        var nv = new NhanVien();
        nv.maNhanVien = mangNhanVien[i].maNhanVien;
        nv.tenNhanVien = mangNhanVien[i].tenNhanVien;
        nv.chucVu = mangNhanVien[i].chucVu;
        nv.heSoChucVu = mangNhanVien[i].heSoChucVu;
        nv.luongCoBan = mangNhanVien[i].luongCoBan;
        nv.soGioLamTrongThang = mangNhanVien[i].soGioLamTrongThang;
        noiDungTable += `
<tr>
<td>${nv.maNhanVien}</td>
<td>${nv.tenNhanVien}</td>
<td>${nv.chucVu}</td>
<td>${nv.luongCoBan}</td>
<td>${nv.tinhTongLuong()}</td>
<td>${nv.soGioLamTrongThang}</td>
<td>${nv.xeploai()}</td>
<td>
<button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xoa</button>
<button class="btn btn-primary" onclick="suaNhanVien('${nv.maNhanVien}')">Chinh sua</button>
</td>
</tr>

`;

    }
    document.querySelector('#tableNhanVien').innerHTML = noiDungTable;
}
layDanhSachNhanVienApi()
document.querySelector('#addStaff').onclick = function () {
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector("#maNhanVien").value;
    nv.tenNhanVien = document.querySelector("#tenNhanVien").value;
    nv.heSoChucVu = document.querySelector("#chucVu").value;
    nv.luongCoBan = document.querySelector("#luongCoBan").value;
    nv.soGioLamTrongThang = document.querySelector("#soGioLamTrongThang").value;
    // console.log(nv);
    var tagchucVu = document.querySelector("#chucVu");
    var arrOption = tagchucVu.options;
    nv.chucVu = arrOption[tagchucVu.selectedIndex].innerHTML;
    var valid = true;
    valid &= validate.kiemTraRong(nv.maNhanVien, "Mã nhân viên", ".kiemTraRong-maNhanVien") &
        validate.kiemTraRong(nv.tenNhanVien, "Tên nhân viên", ".kiemTraRong-tenNhanVien") &
        validate.kiemTraRong(nv.luongCoBan, "Lương cơ bản", ".kiemTraRong-luongCoBan") &
        validate.kiemTraRong(nv.soGioLamTrongThang, "Số giờ làm", ".kiemTraRong-soGioLam");

    // Kiem tra dinh dang
    valid &= validate.kiemTraTatCaLaKiTu(nv.tenNhanVien, "Tên nhân viên", ".kiemTraDinhDang-tenNhanVien") &
        validate.kiemTraDoDaiChuoi(nv.maNhanVien, "Mã nhân viên", ".kiemTraDinhDang-maNhanVien", 4, 6) &
        validate.kiemTraLuongCoBan(nv.luongCoBan, "Lương cơ bản", ".kiemTraDinhDang-luongCoBan", 1000000, 20000000) &
        validate.kiemTraGioLam(nv.soGioLamTrongThang, "Số giờ làm ", ".kiemTraDinhDang-soGioLam", 50, 150)
        ;
    if (!valid) {
        return;
    }
    var promise = nvService.themNhanVien(nv);
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachNhanVienApi();
    });
    promise.catch(function (error) {
        console.log(error.response.data);
    })
}
var xoaNhanVien = function (maNhanVien) {
    var promise = nvService.xoaNhanVien(maNhanVien);
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachNhanVienApi();
    });
    promise.catch(function (error) {
        console.log(error.response.data);
    })
}
var suaNhanVien = function (maNhanVien) {
    var promise = nvService.suaNhanVien(maNhanVien);
    promise.then(function (result) {
        var nv = result.data;
        document.querySelector('#maNhanVien').value = nv.maNhanVien;
        document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
        document.querySelector('#chucVu').value = nv.heSoChucVu;
        document.querySelector("#luongCoBan").value = nv.luongCoBan;
        document.querySelector("#soGioLamTrongThang").value = nv.soGioLamTrongThang;
    });
    promise.catch(function (error) {
        console.log(error.response.data);
    });
}
document.querySelector('#update').onclick = function () {
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector("#maNhanVien").value;
    nv.tenNhanVien = document.querySelector("#tenNhanVien").value;
    nv.heSoChucVu = document.querySelector("#chucVu").value;
    var tagchucVu = document.querySelector("#chucVu");
    console.log(tagchucVu);
    var arrOption = tagchucVu.options;
    console.log(arrOption);
    nv.chucVu = arrOption[tagchucVu.selectedIndex].innerHTML;

    // console.log(nv.chucVu);
    nv.luongCoBan = document.querySelector("#luongCoBan").value;
    nv.soGioLamTrongThang = document.querySelector("#soGioLamTrongThang").value;
    var promise = nvService.capNhatNhanVien(nv.maNhanVien, nv)
    promise.then(function result() {
        console.log(result.data);
        layDanhSachNhanVienApi();
    });
    promise.catch(function (error) {
        console.log(error.response.data);
    })
}
