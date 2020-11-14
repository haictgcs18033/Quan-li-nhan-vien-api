
var mangNhanVien = [];
var validate = new Validation();
document.querySelector("#addStaff").onclick = function () {
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector("#maNhanVien").value;
    nv.tenNhanVien = document.querySelector("#tenNhanVien").value;
    nv.heSoChucVu = document.querySelector("#chucVu").value;
    console.log(nv.chucVu);
    nv.luongCoBan = document.querySelector("#luongCoBan").value;
    nv.soGioLamTrongThang = document.querySelector("#soGioLamTrongThang").value;
    // console.log(nv);
    var tagchucVu = document.querySelector("#chucVu");
    console.log(tagchucVu);
    var arrOption = tagchucVu.options;
    console.log(arrOption);
    nv.chucVu = arrOption[tagchucVu.selectedIndex].innerHTML;
    console.log(nv.chucVu);
    // console.log(nv.chucVu);
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
    mangNhanVien.push(nv);
    // console.log(mangNhanVien);
    renderTable(mangNhanVien);
    // console.log(nv.chucVu);
    // luuLocalStorage();
}

var renderTable = function (arrNV) {
    var noiDungTable = '';
    for (var index = 0; index < arrNV.length; index++) {
        var nhanVien = arrNV[index];
        var nv = new NhanVien(nhanVien.maNhanVien, nhanVien.tenNhanVien, nhanVien.heSoChucVu, nhanVien.luongCoBan, nhanVien.soGioLamTrongThang, nhanVien.chucVu);
        noiDungTable += `
        <tr>
        <td>${nv.maNhanVien}</td>
        <td>${nv.tenNhanVien}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.luongCoBan}</td>
        <td>${nv.tinhTongLuong()}</td>
        <td>${nv.soGioLamTrongThang}</td>
        <td>${nv.xeploai()}</td>
        <td><button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xoa</button></td>
        <td><button class="btn btn-primary" onclick="chinhSua('${nv.maNhanVien}')">Chinh sua</button></td>
        </tr>
                      
 `
    }
    // console.log(noiDungTable);
   
    document.querySelector("#tableNhanVien").innerHTML = noiDungTable;
}
// Xoa Nhan vien
var xoaNhanVien = function (maNV) {
    for (var index = mangNhanVien.length - 1; index >= 0; index--) {
        var nv = mangNhanVien[index];
        if (nv.maNhanVien === maNV) {
            mangNhanVien.splice(index, 1);
        }
    }
    renderTable(mangNhanVien)
}
// Chinh sua nhan vien
var chinhSua = function (maNV) {
    document.querySelector('#maNhanVien').disabled = true;
    for (var index = 0; index < mangNhanVien.length; index++) {
        var nv = mangNhanVien[index];
        if (maNV === nv.maNhanVien) {
            document.querySelector('#maNhanVien').value = nv.maNhanVien;
            document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
            document.querySelector('#chucVu').value = nv.heSoChucVu;
            document.querySelector("#luongCoBan").value = nv.luongCoBan;
            document.querySelector("#soGioLamTrongThang").value = nv.soGioLamTrongThang;
        }
    }
}
// Luu Local
var luuLocalStorage = function () {
    var sMangNhanVien = JSON.stringify(mangNhanVien);
    localStorage.setItem('mangNhanVien', sMangNhanVien);
}
var layMangNhanVienStorage = function () {
    if (localStorage.getItem('mangNhanVien')) {
        var sMangNhanVien = localStorage.getItem('mangNhanVien');
        mangNhanVien = JSON.parse(sMangNhanVien);
        renderTable(mangNhanVien);
    }
}
layMangNhanVienStorage();


document.querySelector('#update').onclick = function () {

    //Lấy thông tin người dùng sau khi thay đổi gán vào đối tượng sinhVien
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

    //Tìm trong mangSinhVien đối tượng cùng mã => cập lại giá trị
    for (var index = 0; index < mangNhanVien.length; index++) {
        var nhanVienCapNhat = mangNhanVien[index];
        //Tìm ra sinhVien trong mảng có mã = với mã sv trên giao diện => cập nhật giá trị
        if (nhanVienCapNhat.maNhanVien === nv.maNhanVien) {
            nhanVienCapNhat.maNhanVien = nv.maNhanVien;
            nhanVienCapNhat.tenNhanVien = nv.tenNhanVien;
            nhanVienCapNhat.heSoChucVu =  nv.heSoChucVu;  
            nhanVienCapNhat.chucVu = nv.chucVu;
            nhanVienCapNhat.luongCoBan = nv.luongCoBan;
            nhanVienCapNhat.soGioLamTrongThang = nv.soGioLamTrongThang;
        }
    }
    console.log(nhanVienCapNhat.chucVu);
    //Gọi hàm tạo lại bảng
    renderTable(mangNhanVien);
    //Gọi hàm lưu vào localstorage
    luuLocalStorage();
    document.querySelector('#maNhanVien').disabled = false;
}
