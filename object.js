//CHÚ THÍCH
// sx: Tọa độ x trong ảnh gốc
// sy: Tọa độ y trong ảnh gốc
// swidth: chiều rộng khi cắt
// sheight: chiều cao khi cắt
// x: vị trí điểm(x) khi ảnh được vẽ lên trên canvas
// y: vị trí điểm(y) khi ảnh được vẽ lên trên canvas
// width: chiều rộng của ảnh khi được vẽ trên trên canvas
// height: chiều cao của ảnh khi được vẽ trên trên canvas
// ax: Tốc độ di chuyển theo trục (x)
//ay: Tốc độ di chuyển theo trục (y)
//status = true: trạng thái của khối Brick khi chưa"chưa bị phá vỡ";


//KHỞI TẠO THÔNG SÔ CHO CÁC ĐỐI TƯỢNG TRONG GAME
const PADDLE = {
        sx: 2,
        sy: 53,
        swidth: 104,
        sheight: 24,
        x: 375,
        y: 560,
        width: 150,
        height: 30,
        ax: 10
    },
    //Create Object Ball
    BALL = {
        sx: 452,
        sy: 2,
        swidth: 22,
        sheight: 22,
        x: 430,
        y: 520,
        width: 35,
        height: 35,
        speed: 6.5,
        ax: 5,
        ay: -5,
    },

    BRICK = [
        blue = {
            row: 1,
            column: 7,
            sx: 386,
            sy: 2,
            swidth: 64,
            sheight: 32,
            width: 100,
            height: 40
        },
        red = {
            row: 1,
            column: 7,
            sx: 372,
            sy: 62,
            swidth: 64,
            sheight: 32,
            width: 100,
            height: 40
        },
        green = {
            row: 1,
            column: 7,
            sx: 2,
            sy: 79,
            swidth: 64,
            sheight: 32,
            width: 100,
            height: 40
        },
        yellow = {
            row: 1,
            column: 7,
            sx: 222,
            sy: 87,
            swidth: 64,
            sheight: 32,
            width: 100,
            height: 40
        },
        siver = {
            row: 1,
            column: 7,
            sx: 90,
            sy: 87,
            swidth: 64,
            sheight: 32,
            width: 100,
            height: 40
        },
        purple = {
            row: 1,
            column: 7,
            sx: 240,
            sy: 53,
            swidth: 64,
            sheight: 32,
            width: 100,
            height: 40
        }
    ];