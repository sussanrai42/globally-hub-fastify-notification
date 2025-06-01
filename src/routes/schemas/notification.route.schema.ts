export const getNotificationsSchema = {
    querystring: {
        type: 'object',
        properties: {
            page: { type: 'number' },
            perPage: { type: 'number' },
        },
    },
}