export const dummyTablesList = [
    {
        name: 'Users',
        columns: [
            { name: 'id', datatype: 'INT', is_nullable: false, is_primary_key: true },
            { name: 'username', datatype: 'VARCHAR(50)', is_nullable: false, is_primary_key: false },
            { name: 'password', datatype: 'VARCHAR(255)', is_nullable: false, is_primary_key: false },
            { name: 'email', datatype: 'VARCHAR(100)', is_nullable: false, is_primary_key: false },
            // { name: 'first_name', datatype: 'VARCHAR(50)', is_nullable: true, is_primary_key: false },
            // { name: 'last_name', datatype: 'VARCHAR(50)', is_nullable: true, is_primary_key: false },
            // { name: 'date_of_birth', datatype: 'DATE', is_nullable: true, is_primary_key: false },
            // { name: 'created_at', datatype: 'DATETIME', is_nullable: false, is_primary_key: false },
            // { name: 'updated_at', datatype: 'DATETIME', is_nullable: true, is_primary_key: false },
            // { name: 'status', datatype: 'VARCHAR(20)', is_nullable: false, is_primary_key: false }
        ]
    },
    {
        name: 'Products',
        columns: [
            { name: 'id', datatype: 'INT', is_nullable: false, is_primary_key: true },
            { name: 'name', datatype: 'VARCHAR(100)', is_nullable: false, is_primary_key: false },
            { name: 'description', datatype: 'TEXT', is_nullable: true, is_primary_key: false },
            { name: 'price', datatype: 'DECIMAL(10,2)', is_nullable: false, is_primary_key: false },
            { name: 'quantity', datatype: 'INT', is_nullable: false, is_primary_key: false },
            { name: 'category_id', datatype: 'INT', is_nullable: false, is_primary_key: false },
            { name: 'sku', datatype: 'VARCHAR(50)', is_nullable: false, is_primary_key: false },
            { name: 'created_at', datatype: 'DATETIME', is_nullable: false, is_primary_key: false },
            { name: 'updated_at', datatype: 'DATETIME', is_nullable: true, is_primary_key: false },
            { name: 'status', datatype: 'VARCHAR(20)', is_nullable: false, is_primary_key: false }
        ]
    },
    {
        name: 'Orders',
        columns: [
            { name: 'id', datatype: 'INT', is_nullable: false, is_primary_key: true },
            { name: 'user_id', datatype: 'INT', is_nullable: false, is_primary_key: false },
            { name: 'order_date', datatype: 'DATETIME', is_nullable: false, is_primary_key: false },
            { name: 'shipping_date', datatype: 'DATETIME', is_nullable: true, is_primary_key: false },
            { name: 'total_amount', datatype: 'DECIMAL(10,2)', is_nullable: false, is_primary_key: false },
            { name: 'status', datatype: 'VARCHAR(20)', is_nullable: false, is_primary_key: false },
            { name: 'tracking_number', datatype: 'VARCHAR(50)', is_nullable: true, is_primary_key: false },
            { name: 'payment_method', datatype: 'VARCHAR(50)', is_nullable: false, is_primary_key: false },
            { name: 'shipping_address', datatype: 'TEXT', is_nullable: false, is_primary_key: false },
            { name: 'billing_address', datatype: 'TEXT', is_nullable: false, is_primary_key: false }
        ]
    },
    {
        name: 'Categories',
        columns: [
            { name: 'id', datatype: 'INT', is_nullable: false, is_primary_key: true },
            { name: 'name', datatype: 'VARCHAR(50)', is_nullable: false, is_primary_key: false },
            { name: 'description', datatype: 'TEXT', is_nullable: true, is_primary_key: false },
            { name: 'parent_category_id', datatype: 'INT', is_nullable: true, is_primary_key: false },
            { name: 'created_at', datatype: 'DATETIME', is_nullable: false, is_primary_key: false },
            { name: 'updated_at', datatype: 'DATETIME', is_nullable: true, is_primary_key: false },
            { name: 'status', datatype: 'VARCHAR(20)', is_nullable: false, is_primary_key: false },
            { name: 'slug', datatype: 'VARCHAR(100)', is_nullable: false, is_primary_key: false },
            { name: 'image_url', datatype: 'TEXT', is_nullable: true, is_primary_key: false },
            { name: 'meta_keywords', datatype: 'TEXT', is_nullable: true, is_primary_key: false }
        ]
    },
    {
        name: 'Transactions',
        columns: [
            { name: 'id', datatype: 'INT', is_nullable: false, is_primary_key: true },
            { name: 'order_id', datatype: 'INT', is_nullable: false, is_primary_key: false },
            { name: 'payment_method', datatype: 'VARCHAR(50)', is_nullable: false, is_primary_key: false },
            { name: 'transaction_date', datatype: 'DATETIME', is_nullable: false, is_primary_key: false },
            { name: 'amount', datatype: 'DECIMAL(10,2)', is_nullable: false, is_primary_key: false },
            { name: 'status', datatype: 'VARCHAR(20)', is_nullable: false, is_primary_key: false },
            { name: 'reference_number', datatype: 'VARCHAR(100)', is_nullable: false, is_primary_key: false },
            { name: 'user_id', datatype: 'INT', is_nullable: false, is_primary_key: false },
            { name: 'created_at', datatype: 'DATETIME', is_nullable: false, is_primary_key: false },
            { name: 'updated_at', datatype: 'DATETIME', is_nullable: true, is_primary_key: false }
        ]
    },
    // Add additional tables similarly.
];
