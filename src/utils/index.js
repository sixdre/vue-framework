//获取图片宽高
export const getImageWh = function (file) {
    return new Promise(function(resolve, reject) {
        try {
            var image = new Image()
            image.src = URL.createObjectURL(file);
            image.onload = function() {
                var w = image.width;
                var h = image.height;
                resolve([w, h]);
            }
        } catch(err) {
            reject(err);
        }
    });
}