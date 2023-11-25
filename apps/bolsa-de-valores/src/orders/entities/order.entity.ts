import {
    AutoIncrement,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({ tableName: 'orders' })
export class Order extends Model{
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;
    
    @Column({
        type: DataType.STRING,
    })
    account_id: string;

    @Column({
        type: DataType.STRING,
    })
    asset_id: string;

    @Column({
        type: DataType.INTEGER,
    })
    quantity: number;

    @Column({
        type: DataType.STRING,
    })
    status: string;
}
