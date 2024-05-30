// Converts Kelvin to Celsius and rounds to one decimal
export const toCelsius = (kelvin: number)  => {
    return Math.round((kelvin - 273.15) * 10) / 10;
}