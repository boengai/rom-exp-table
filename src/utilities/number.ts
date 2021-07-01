const intlNumberFormat = Intl.NumberFormat('en')

export function numberFormat(v: number | null): string {
    if (!v) {
        return '';
    }

    return intlNumberFormat.format(v)
}