// TODO: add this to env config
export default {
  uri: 'mongodb://root:password@localhost/barbershop-db-js?authSource=admin',
  options: {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  },
};
