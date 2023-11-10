export function numberWithCommas(x:Number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}