1. npm init -y
2. npm i pg express ejs sequelize
3. npm i -D sequelize-cli
4. touch .gitignore => isi dengan node_modules
5. npx sequelize init
6. ubah configurasi di config/config.json

LEVEL DATABASE
7. buat database sesuai config = npx sequelize db:create
8. buat tabel & model/class = npx sequelize model:create --name Band --attributes name:string,debutYear:integer,domisili:string
--  catatan = 
---- buat model harus sesuai dg urutan, yg gapunya FK duluan
---- nama model harus singular/ nama tabel di singularkan
---- tambahkan FK di migration (bagian ForeignKey Usage) = https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface#instance-method-createTable
---- buat dulu semua modelnya
9. jalankan file migration = npx sequelize db:migrate
10. buat custom migration = npx sequelize migration:create --name add-column-FK-to-Songs
---- jangan lupa set FK jika menambahkan kolom FK
11. kalau file migrasi belum dijalankan, jalankan pake cara no. 9
12. setelah buat custom migration pastikan modelnya juga diubah (cont: tambah kolom)
13. buat file seeder = npx sequelize seed:create --name seed-Bands
---- buat seeder harus sesuai dg urutan, yg gapunya FK duluan / samain dg urutan migrasi
---- isi dulu semua file seedernya, jangan lupa hapus id lalu tambahkan createdAt dan updatedAt
14. jalankan semua file seeder = npx sequelize db:seed:all

LEVEL APP
15. Setting relasi secara app/sequelize di Model
---- https://sequelize.org/docs/v6/core-concepts/assocs/
---- {"name":"SequelizeEagerLoadingError"} => jika tidak setup association di model
---- {"name":"SequelizeDatabaseError"} => setup association tp relasinya salah, tp bisa jadi error validasi(saat add/edit)



NOTE: 
- npx sequelize --help