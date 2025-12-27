FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=transactions
ENV MYSQL_USER=expense
ENV MYSQL_PASSWORD=ExpenseApp@123

COPY schema.sql /docker-entrypoint-initdb.d/
