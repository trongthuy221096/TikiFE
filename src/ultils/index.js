export const isJsonString = (data) => {
    try {
        JSON.parse(data);
    } catch (error) {
        return false;
    }
    return true;
};
export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const splitArray = (array) => {
    const result = [];
    let tmp = [];

    if (array.length > 0) {
        array?.forEach((item) => {
            if (tmp.length < 6) {
                tmp.push(item);
            } else {
                result.push(tmp);
                tmp = [item];
            }
        });
    }

    if (tmp.length > 0) {
        result.push(tmp);
    }

    return result;
};
export const getItem = (label, key, icon, children) => {
    return {
        key,
        icon,
        children,
        label,
    };
};

export const showMax50 = (str) => {
    if (str.length > 65) {
        return str.slice(0, 65) + "...";
    } else {
        return str;
    }
};

export const showMax90 = (str) => {
    if (str.length > 90) {
        return str.slice(0, 90) + "...";
    } else {
        return str;
    }
};

export const convertDateTimeFormat = (inputDateTime) => {
    const inputDate = new Date(inputDateTime);

    // Extract date components
    const year = inputDate.getUTCFullYear();
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getUTCDate()).padStart(2, "0");

    // Extract time components
    const hours = String(inputDate.getUTCHours()).padStart(2, "0");
    const minutes = String(inputDate.getUTCMinutes()).padStart(2, "0");
    const seconds = String(inputDate.getUTCSeconds()).padStart(2, "0");

    // Format the date and time
    const formattedDateTime = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;

    return formattedDateTime;
};

export const convertDateFormat = (inputDateTime) => {
    const inputDate = new Date(inputDateTime);

    // Extract date components
    const year = inputDate.getUTCFullYear();
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getUTCDate()).padStart(2, "0");

    // Format the date and time
    const formattedDateTime = `${day}-${month}-${year}`;

    return formattedDateTime;
};

export const compareString = (a, b) => {
    const value1 = a || "";
    const value2 = b || "";
    return value1.localeCompare(value2);
};

export const compareDate = (a, b) => {
    // Kiểm tra xem trường 'birthday' có tồn tại và hợp lệ không
    const value1 = a ? new Date(a) : null;
    const value2 = b ? new Date(b) : null;

    // Xử lý trường hợp một trong hai ngày sinh không hợp lệ
    if (!value1 && !value2) return 0; // Trường hợp cả hai đều không hợp lệ, không cần sắp xếp
    if (!value1) return 1; // Trường hợp ngày sinh của a không hợp lệ, đưa a về sau
    if (!value2) return -1; // Trường hợp ngày sinh của b không hợp lệ, đưa b về sau

    // Sắp xếp bình thường nếu cả hai ngày sinh đều hợp lệ
    return value1 - value2;
};

export const comparePrice = (a, b) => {
    // Kiểm tra xem trường 'price' có tồn tại và là số không
    const priceA = typeof a === "number" ? a : null;
    const priceB = typeof b === "number" ? b : null;

    // Xử lý trường hợp một trong hai giá không hợp lệ
    if (priceA === null && priceB === null) return 0; // Trường hợp cả hai đều không hợp lệ, không cần sắp xếp
    if (priceA === null) return 1; // Trường hợp giá của a không hợp lệ, đưa a về sau
    if (priceB === null) return -1; // Trường hợp giá của b không hợp lệ, đưa b về sau

    // Sắp xếp bình thường nếu cả hai giá đều hợp lệ
    return priceA - priceB;
};
export const convertStringToDate = (dateString) => {
    const [day, month, year] = dateString.split("-");

    return new Date(year, month - 1, day);
};

export const renderOptions = (arr) => {
    let results = [];
    if (arr) {
        results = arr?.map((opt) => {
            return {
                value: opt.name,
                label: opt.name,
            };
        });
    }
    return results;
};
export const convertToSlug = (text) => {
    return text
        .toLowerCase() // Chuyển đổi chữ viết hoa thành chữ viết thường
        .normalize("NFD") // Chuẩn hóa Unicode (loại bỏ dấu)
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d") // Thay thế chữ "đ" thành "d"
        .replace(/[^a-z0-9]/g, "_") // Thay thế các ký tự không hợp lệ bằng dấu gạch dưới
        .replace(/_+/g, "-") // Loại bỏ các dấu gạch dưới liên tiếp
        .replace(/^_+|_+$/g, ""); // Loại bỏ các dấu gạch dưới ở đầu và cuối chuỗi
};
export const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString().replaceAll(",", ".");
        return `${result}`;
    } catch (error) {
        return null;
    }
};
export function getFirstLetters(fullName) {
    let firstLetters = "";
    if (fullName) {
        const parts = fullName.split(" ");
        if (parts.length > 1) {
            firstLetters += parts[0][0]; // Lấy ký tự đầu tiên của họ
            firstLetters += parts[parts.length - 1][0]; // Lấy ký tự đầu tiên của tên
        } else {
            firstLetters += parts[0][0];
        }
    }

    return firstLetters.toUpperCase();
}

export function getStringDate(fullName) {
    var daysOfWeek = [
        "chủ Nhật",
        "thứ Hai",
        "thứ Ba",
        "thứ Tư",
        "thứ Năm",
        "thứ Sáu",
        "thứ Bảy",
    ];

    // Tạo một đối tượng Date
    var today = new Date();

    // Lấy ngày, tháng, năm và thứ từ đối tượng Date
    var day = today.getDate() + 2;
    var month = today.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
    var year = today.getFullYear();
    var dayOfWeek = today.getDay(); // Trả về một số từ 0 đến 6

    // Hiển thị ngày và thứ theo định dạng mong muốn (dd/mm/yyyy, Thứ ...)
    var formattedDate = day + "/" + month + "/" + year;
    var formattedDayOfWeek = daysOfWeek[dayOfWeek + 2];

    return "Giao " + formattedDayOfWeek + " " + formattedDate;
}
