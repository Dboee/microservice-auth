// import { Sequelize, Model, DataTypes } from 'sequelize';
// import { Password } from '../services/password';

// class User extends Model {
//   public static initModel(sequelize: Sequelize) {
//     this.init(
//       {
//         id: {
//           type: DataTypes.INTEGER,
//           autoIncrement: true,
//           primaryKey: true,
//         },
//         email: {
//           type: DataTypes.STRING,
//           allowNull: false,
//           unique: true,
//         },
//         password: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//       },
//       {
//         sequelize,
//         tableName: 'users',
//         hooks: {
//           beforeSave: this.beforeSave,
//         },
//       }
//     );
//   }

//   public static async beforeSave(user: User) {
//     if (user.changed('password')) {
//       user.password = await Password.toHash(user.password);
//     }
//   }

//   public id!: number;
//   public email!: string;
//   public password!: string;
// }

// export { User };
