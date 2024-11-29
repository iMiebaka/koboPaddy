function formatCurrency(numb: number) {
    return new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY',
        currencyDisplay: "code"
    })
        .format(numb)
        .replace('JPY', "")
        .trim();
}


export { formatCurrency }