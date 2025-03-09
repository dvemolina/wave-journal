import * as enums from '$src/lib/enums/enums'

function formatEnumLabel(value: string | number): string | number {
    if (typeof value === 'string') {
        return value
            .split('_') // Split words by underscores
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' '); // Rejoin with spaces
    } else {
        return value
    }
}

// Automatically convert all enums
export const formattedEnums = Object.fromEntries(
    Object.entries(enums).map(([key, values]) => [
        key, values.map(value => ({ value, label: formatEnumLabel(value) }))
    ])
);