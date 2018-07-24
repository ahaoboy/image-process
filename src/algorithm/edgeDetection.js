import { template } from './template';
/**
 * 说明
 * 该函数用Robert边缘检测算子对图像进行边缘检测运算。
 * 要求目标图像为灰度图像
 * @param data
 * @param lWidth
 * @param lHeight
 * Roberts边缘检测算子是一种利用局部差分算子寻找边缘的算子
 * 平方根运算使该处理类似于在人类视觉系统中发生的过程
 */
function robertDIB(data, lWidth, lHeight) {
    // 保存原始数据
    const dataInit = [];
    for (let i = 0, len = data.length; i < len; i++) {
        dataInit[i] = data[i];
    }
    for (let j = 1; j < lHeight - 1; j++) {
        for (let i = 0; i < lWidth - 1; i++) {
            // 由于使用2*2对模版，为防止越界，所以不处理最下边和最右边对两列像素
            const lpSrc = j * lWidth + i;
            const pixel = [lpSrc, lpSrc + 1, lpSrc - lWidth, lpSrc - lWidth + 1];
            for (let k = 0; k < 3; k++) {
                data[lpSrc * 4 + k] = Math.sqrt(Math.pow(dataInit[pixel[0] * 4 + k] - dataInit[pixel[3] * 4 + k], 2) +
                    Math.pow(dataInit[pixel[1] * 4 + k] - dataInit[pixel[2] * 4 + k], 2));
            }
        }
    }
}

/**
 * 说明
 * 该函数用Sobel边缘检测算子对图像进行边缘检测运算。
 * 要求目标图像为灰度图像
 * @param data
 * @param lWidth
 * @param lHeight
 */
function sobelDIB(data, lWidth, lHeight) {
    // 保存原始数据
    const dataInitOne = [];
    const dataInitTwo = [];
    for (let i = 0, len = data.length; i < len; i++) {
        dataInitOne[i] = dataInitTwo[i] = data[i];
    }
    // 第一个模版参数
    const sobelTemOneObj = {
        iTempW: 3,
        iTempH: 3,
        fCoef: 1,
        iTempMX: 1,
        iTempMY: 1,
        fpArray: [-1, -2, -1, 0, 0, 0, 1, 2, 1]
    };
    // 第二个模版参数
    const sobelTemTwoObj = {
        iTempW: 3,
        iTempH: 3,
        fCoef: 1,
        iTempMX: 1,
        iTempMY: 1,
        fpArray: [-1, 0, 1, -2, 0, 2, -1, 0, 1]
    };
    template(dataInitOne, lWidth, lHeight, sobelTemOneObj);
    template(dataInitTwo, lWidth, lHeight, sobelTemTwoObj);
    for (let i = 0, len = data.length; i < len; i++) {
        data[i] = dataInitOne[i] > dataInitTwo[i] ? dataInitOne[i] : dataInitTwo[i];
    }
}

/**
 * 说明
 * 该函数用Prewitt边缘检测算子对图像进行边缘检测运算。
 * 要求目标图像为灰度图像
 * @param data
 * @param lWidth
 * @param lHeight
 */
function prewittDIB(data, lWidth, lHeight) {
    // 保存原始数据
    const dataInitOne = [];
    const dataInitTwo = [];
    for (let i = 0, len = data.length; i < len; i++) {
        dataInitOne[i] = dataInitTwo[i] = data[i];
    }
    // 第一个模版参数
    const sobelTemOneObj = {
        iTempW: 3,
        iTempH: 3,
        fCoef: 1,
        iTempMX: 1,
        iTempMY: 1,
        fpArray: [-1, -1, -1, 0, 0, 0, 1, 1, 1]
    };
    // 第二个模版参数
    const sobelTemTwoObj = {
        iTempW: 3,
        iTempH: 3,
        fCoef: 1,
        iTempMX: 1,
        iTempMY: 1,
        fpArray: [1, 0, -1, 1, 0, -1, 1, 0, -1]
    };
    template(dataInitOne, lWidth, lHeight, sobelTemOneObj);
    template(dataInitTwo, lWidth, lHeight, sobelTemTwoObj);
    for (let i = 0, len = data.length; i < len; i++) {
        data[i] = dataInitOne[i] > dataInitTwo[i] ? dataInitOne[i] : dataInitTwo[i];
    }
}

/**
 * 说明
 * 该函数用kirschDIB边缘检测算子对图像进行边缘检测运算。
 * 要求目标图像为灰度图像
 * @param data
 * @param lWidth
 * @param lHeight
 */
function kirschDIB(data, lWidth, lHeight) {
    const dataInitOne = [];
    const dataInitTwo = [];
    for (let i = 0, len = data.length; i < len; i++) {
        dataInitOne[i] = dataInitTwo[i] = data[i];
    }
    // 第一个模版参数
    const temObj = {
        iTempW: 3,
        iTempH: 3,
        fCoef: 1,
        iTempMX: 1,
        iTempMY: 1,
        fpArray: []
    };
    // 第一个模版参数
    temObj.fpArray = [5, 5, 5, -3, 0, -3, -3, -3, -3];
    template(dataInitOne, lWidth, lHeight, temObj);
    // 第二个模版参数
    temObj.fpArray = [-3, 5, 5, -3, 0, 5, -3, -3, -3];
    template(dataInitTwo, lWidth, lHeight, temObj);
    for (let i = 0, len = data.length; i < len; i++) {
        dataInitOne[i] = dataInitOne[i] > dataInitTwo[i] ? dataInitOne[i] : dataInitTwo[i];
    }
    // 第三个模版参数
    temObj.fpArray = [-3, -3, 5, -3, 0, 5, -3, -3, 5];
    for (let i = 0, len = data.length; i < len; i++) {
        dataInitTwo[i] = data[i];
    }
    template(dataInitTwo, lWidth, lHeight, temObj);
    for (let i = 0, len = data.length; i < len; i++) {
        dataInitOne[i] = dataInitOne[i] > dataInitTwo[i] ? dataInitOne[i] : dataInitTwo[i];
    }
    // 第四个模版参数
    temObj.fpArray = [-3, -3, -3, -3, 0, 5, -3, 5, 5];
    for (let i = 0, len = data.length; i < len; i++) {
        dataInitTwo[i] = data[i];
    }
    template(dataInitTwo, lWidth, lHeight, temObj);
    for (let i = 0, len = data.length; i < len; i++) {
        dataInitOne[i] = dataInitOne[i] > dataInitTwo[i] ? dataInitOne[i] : dataInitTwo[i];
    }
    // 第五个模版参数
    temObj.fpArray = [-3, -3, -3, -3, 0, -3, 5, 5, 5];
    for (let i = 0, len = data.length; i < len; i++) {
        dataInitTwo[i] = data[i];
    }
    template(dataInitTwo, lWidth, lHeight, temObj);
    for (let i = 0, len = data.length; i < len; i++) {
        dataInitOne[i] = dataInitOne[i] > dataInitTwo[i] ? dataInitOne[i] : dataInitTwo[i];
    }
    // 第六个模版参数
    temObj.fpArray = [-3, -3, -3, 5, 0, -3, 5, 5, -3];
    for (let i = 0, len = data.length; i < len; i++) {
        dataInitTwo[i] = data[i];
    }
    template(dataInitTwo, lWidth, lHeight, temObj);
    for (let i = 0, len = data.length; i < len; i++) {
        dataInitOne[i] = dataInitOne[i] > dataInitTwo[i] ? dataInitOne[i] : dataInitTwo[i];
    }
    // 第七个模版参数
    temObj.fpArray = [5, -3, -3, 5, 0, -3, 5, -3, -3];
    for (let i = 0, len = data.length; i < len; i++) {
        dataInitTwo[i] = data[i];
    }
    template(dataInitTwo, lWidth, lHeight, temObj);
    for (let i = 0, len = data.length; i < len; i++) {
        dataInitOne[i] = dataInitOne[i] > dataInitTwo[i] ? dataInitOne[i] : dataInitTwo[i];
    }
    // 第八个模版参数
    temObj.fpArray = [5, 5, -3, 5, 0, -3, -3, -3, -3];
    for (let i = 0, len = data.length; i < len; i++) {
        dataInitTwo[i] = data[i];
    }
    template(dataInitTwo, lWidth, lHeight, temObj);
    for (let i = 0, len = data.length; i < len; i++) {
        data[i] = dataInitOne[i] > dataInitTwo[i] ? dataInitOne[i] : dataInitTwo[i];
    }
}

/**
 * 说明
 * 该函数用高斯拉普拉斯边缘检测算子对图像进行边缘检测运算。
 * 要求目标图像为灰度图像
 * @param data
 * @param lWidth
 * @param lHeight
 */
function GaussDIB(data, lWidth, lHeight) {
    const temObj = {
        iTempW: 5,
        iTempH: 5,
        fCoef: 1,
        iTempMX: 3,
        iTempMY: 3,
        fpArray: [
            -2, -4, -4, -4, -2,
            -4, 0, 8, 0, -4,
            -4, 8, 24, 8, -4,
            -4, 0, 8, 0, -4,
            -2, -4, -4, -4, -2
        ]
    };
    template(data, lWidth, lHeight, temObj);
}

/**
 * 说明
 * 该函数用于对图像进行轮廓提取运算
 * 要求目标图像为只有0和255两个灰度值对灰度图像
 * @param data
 * @param lWidth
 * @param lHeight
 */
function contourDIB(data, lWidth, lHeight) {
    // 保存原始数据
    const dataInit = [];
    for (let i = 0, len = data.length; i < len; i++) {
        dataInit[i] = data[i];
    }
    for (let j = 1; j < lHeight - 1; j++) {
        for (let i = 1; i < lWidth - 1; i++) {
            const lpSrc = j * lWidth + i;
            const pixel = dataInit[lpSrc * 4];
            if (pixel === 0) {
                const surroundArr = [lpSrc + lWidth - 1, lpSrc + lWidth,
                    lpSrc + lWidth + 1, lpSrc - 1, lpSrc + 1,
                    lpSrc - lWidth - 1, lpSrc - lWidth, lpSrc - lWidth + 1];
                let value = 0;
                for (let m = 0, len = surroundArr.length; m < len; m++) {
                    value += dataInit[surroundArr[m] * 4];
                }
                // 如果相邻对八个点都是黑点
                if (value === 0) {
                    for (let k = 0; k < 3; k++) {
                        data[lpSrc * 4 + k] = 255;
                    }
                }
            }
        }
    }
}

/**
 * 说明
 * 该函数用于对图像进行轮廓跟踪运算
 * 要求目标图像为只有0和255两个灰度值对灰度图像
 * @param data
 * @param lWidth
 * @param lHeight
 */
function traceDIB(data, lWidth, lHeight) {
    // 保存原始数据
    const dataInit = [];
    for (let i = 0, len = data.length; i < len; i++) {
        dataInit[i] = data[i];
        data[i] = 255;
    }
    const direction = [[-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0]];
    const length = direction.length;
    // 先找到最左上方对边界点
    let bFindStartPoint = false;
    // 是否扫描到一个边界点
    let bFindPoint = false;
    const startPoint = {
        width: 0,
        height: 0
    };
    const currentPoint = {
        width: 0,
        height: 0
    };
    for (let j = 0; j < lHeight && !bFindStartPoint; j++) {
        for (let i = 0; i < lWidth && !bFindStartPoint; i++) {
            const lpSrc = j * lWidth + i;
            const pixel = dataInit[lpSrc * 4];
            if (pixel === 0) {
                bFindStartPoint = true;
                startPoint.height = j;
                startPoint.width = i;
                // 寻找第一个点
                for (let k = 0; k < 3; k++) {
                    data[lpSrc * 4 + k] = 0;
                }
            }
        }
    }
    let beginDirect = 0;
    bFindStartPoint = false;
    // 从初始点开始扫描
    currentPoint.height = startPoint.height;
    currentPoint.width = startPoint.width;
    while (!bFindStartPoint) {
        bFindPoint = false;
        while (!bFindPoint) {
            // 沿扫描方向查看一个像素
            const lpSrc = (currentPoint.height + direction[beginDirect][1]) * lWidth +
                (currentPoint.width + direction[beginDirect][0]);
            const pixel = dataInit[lpSrc * 4];
            if (pixel === 0) {
                bFindPoint = true;
                currentPoint.height = currentPoint.height + direction[beginDirect][1];
                currentPoint.width = currentPoint.width + direction[beginDirect][0];
                if (currentPoint.height === startPoint.height &&
                    currentPoint.width === startPoint.width) {
                    bFindStartPoint = true;
                }
                for (let k = 0; k < 3; k++) {
                    data[lpSrc * 4 + k] = 0;
                }
                // 扫描点方向逆时针旋转两格
                beginDirect = (beginDirect + length - 2) % length;
            } else {
                // 扫描点方向顺时针旋转一格
                beginDirect = (beginDirect + 1) % length;
            }
        }
    }
}
export { robertDIB, sobelDIB, prewittDIB, kirschDIB, GaussDIB, contourDIB, traceDIB };