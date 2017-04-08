CREATE TABLE "account" (
    "accountid" serial NOT NULL UNIQUE,
    "vendoraccountid" integer NOT NULL,
    "typeid" integer NOT NULL,
    "statusid" integer NOT NULL,
    "creationdate" DATE NOT NULL,
    "companyname" varchar(120),
    "address1" varchar(80) NOT NULL,
    "address2" varchar(80),
    "city" varchar(40) NOT NULL,
    "state" varchar(80) NOT NULL,
    "zip" VARCHAR(10) NOT NULL,
    "countryid" VARCHAR(2) NOT NULL,
    CONSTRAINT account_pk PRIMARY KEY ("accountid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "salesorder" (
    "orderid" serial NOT NULL,
    "customeraccountid" integer NOT NULL,
    "ordernbr" VARCHAR(255) NOT NULL,
    "orderstatusid" varchar(2) NOT NULL,
    "ordertypeid" varchar(2) NOT NULL,
    "docdate" DATETIME NOT NULL,
    "total_value" FLOAT NOT NULL,
    "descr" VARCHAR(255) NOT NULL,
    "salesid" VARCHAR(255) NOT NULL,
    CONSTRAINT salesorder_pk PRIMARY KEY ("orderid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ardoc" (
    "docid" serial NOT NULL,
    "docnum" varchar(20) NOT NULL,
    "statusid" integer NOT NULL,
    "total_value" FLOAT NOT NULL,
    "customeraccountid" integer NOT NULL,
    "docdate" DATE NOT NULL,
    "description" TEXT NOT NULL,
    "salesid" varchar(80),
    "creditdocid" integer NOT NULL,
    "doctypeid" integer NOT NULL,
    CONSTRAINT ardoc_pk PRIMARY KEY ("docid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "resource" (
    "resourceid" serial NOT NULL,
    "name" varchar(250) NOT NULL,
    "description" TEXT NOT NULL,
    "accountid" integer NOT NULL,
    CONSTRAINT resource_pk PRIMARY KEY ("resourceid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "docdet" (
    "detid" serial NOT NULL,
    "docid" integer NOT NULL,
    "unitprice_value" FLOAT NOT NULL,
    "extendedprice_value" FLOAT NOT NULL,
    "servqty" FLOAT NOT NULL,
    "duration" FLOAT NOT NULL,
    "durbillperiod" integer NOT NULL,
    "durbillperiodtypeid" integer NOT NULL,
    "planperiodid" integer NOT NULL,
    "resourceid" integer,
    "discountamt_value" FLOAT NOT NULL,
    "plancategoryid" integer NOT NULL,
    "ddorddetid" integer NOT NULL,
    "ddorderid" integer NOT NULL,
    "subscriptionid" integer NOT NULL,
    "descr" VARCHAR(255) NOT NULL,
    CONSTRAINT docdet_pk PRIMARY KEY ("detid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "note" (
    "noteid" serial NOT NULL,
    "shortdescr" varchar(100),
    "creationdate" DATETIME NOT NULL,
    "accountid" integer NOT NULL,
    "description" TEXT,
    CONSTRAINT note_pk PRIMARY KEY ("noteid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "orddet" (
    "detid" serial NOT NULL,
    "orderid" integer NOT NULL,
    "unitprice_value" FLOAT NOT NULL,
    "servqty" FLOAT NOT NULL,
    "duration" FLOAT NOT NULL,
    "durbilperiod" integer NOT NULL,
    "durbullperiodtypeid" integer NOT NULL,
    "discountamt_value" FLOAT NOT NULL,
    "extendedprice_value" FLOAT NOT NULL,
    "plancategoryid" integer NOT NULL,
    "subscriptionid" integer,
    "planperiodid" integer NOT NULL,
    "resourceid" integer,
    "descr" varchar(4096) NOT NULL,
    CONSTRAINT orddet_pk PRIMARY KEY ("detid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plan" (
    "planid" serial NOT NULL,
    "name" varchar(250) NOT NULL,
    "plancategoryid" integer NOT NULL,
    "shortdescription" TEXT NOT NULL,
    "longdescription" TEXT NOT NULL,
    "accountid" integer NOT NULL,
    "billingperiodtypeid" integer NOT NULL,
    "billingperiod" integer NOT NULL,
    "isautorenew" BOOLEAN NOT NULL,
    "reneworderinterval" integer NOT NULL,
    CONSTRAINT plan_pk PRIMARY KEY ("planid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plancategory" (
    "plancategoryid" serial NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "accountid" integer NOT NULL,
    CONSTRAINT plancategory_pk PRIMARY KEY ("plancategoryid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "planperiod" (
    "planperiodid" serial NOT NULL,
    "planid" integer NOT NULL,
    "period" integer NOT NULL,
    "periodtypeid" integer NOT NULL,
    "setupfee" FLOAT NOT NULL,
    "subscriptionfee" FLOAT NOT NULL,
    "renewalfee" FLOAT NOT NULL,
    CONSTRAINT planperiod_pk PRIMARY KEY ("planperiodid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "planrate" (
    "planrateid" serial NOT NULL,
    "planid" integer NOT NULL,
    "resourceid" integer NOT NULL,
    "setupfee" FLOAT NOT NULL,
    "recurringfee" FLOAT NOT NULL,
    "costforadditional" FLOAT NOT NULL,
    "includedvalue" FLOAT NOT NULL,
    "maxvalue" FLOAT NOT NULL,
    CONSTRAINT planrate_pk PRIMARY KEY ("planrateid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "salesperson" (
    "salesid" VARCHAR(255) NOT NULL,
    "vendoraccountid" integer NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "salescommission" FLOAT NOT NULL,
    "recurringcommission" FLOAT NOT NULL,
    CONSTRAINT salesperson_pk PRIMARY KEY ("salesid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "subscrparam" (
    "subscriptionid" integer NOT NULL,
    "resourceid" integer NOT NULL,
    "includedvalue" FLOAT NOT NULL,
    "amount" FLOAT NOT NULL,
    "maxvalue" FLOAT NOT NULL,
    "setupfee" FLOAT NOT NULL,
    "recurringfee" FLOAT NOT NULL,
    "costforadditional" FLOAT NOT NULL,
    CONSTRAINT subscrparam_pk PRIMARY KEY ("subscriptionid","resourceid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "subscription" (
    "subscriptionid" serial NOT NULL,
    "subscriptionname" VARCHAR(255) NOT NULL,
    "statusid" integer NOT NULL,
    "startdate" DATETIME NOT NULL,
    "expirationdate" DATETIME NOT NULL,
    "shutdowndate" DATETIME NOT NULL,
    "terminationdate" DATETIME NOT NULL,
    "accountid" integer NOT NULL,
    "planid" integer NOT NULL,
    "period" integer NOT NULL,
    "periodtypeid" integer NOT NULL,
    "billingperiodtypeid" integer NOT NULL,
    "billingperiod" integer NOT NULL,
    "lastbilldate" DATETIME NOT NULL,
    "nextbilldate" DATETIME NOT NULL,
    "isautorenew" BOOLEAN NOT NULL,
    "reneworderinterval" integer NOT NULL,
    "setupfee" FLOAT NOT NULL,
    "subscriptionfee" FLOAT NOT NULL,
    "renewalfee" FLOAT NOT NULL,
    CONSTRAINT subscription_pk PRIMARY KEY ("subscriptionid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "periodtype" (
    "id" integer NOT NULL,
    "name" varchar(40) NOT NULL,
    CONSTRAINT periodtype_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "docstatus" (
    "id" integer NOT NULL,
    "name" varchar(40) NOT NULL,
    CONSTRAINT docstatus_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "substatus" (
    "id" integer NOT NULL,
    "name" varchar(40) NOT NULL,
    CONSTRAINT substatus_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "accountstatus" (
    "id" integer NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    CONSTRAINT accountstatus_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "orderstatus" (
    "id" varchar(2) NOT NULL,
    "name" varchar(40) NOT NULL,
    CONSTRAINT orderstatus_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ordertype" (
    "id" varchar(2) NOT NULL,
    "name" varchar(40) NOT NULL,
    CONSTRAINT ordertype_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "doctype" (
    "id" integer NOT NULL,
    "name" varchar(40) NOT NULL,
    CONSTRAINT doctype_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "account" ADD CONSTRAINT "account_fk0" FOREIGN KEY ("vendoraccountid") REFERENCES "account"("accountid");
ALTER TABLE "account" ADD CONSTRAINT "account_fk1" FOREIGN KEY ("statusid") REFERENCES "accountstatus"("id");

ALTER TABLE "salesorder" ADD CONSTRAINT "salesorder_fk0" FOREIGN KEY ("customeraccountid") REFERENCES "account"("accountid");
ALTER TABLE "salesorder" ADD CONSTRAINT "salesorder_fk1" FOREIGN KEY ("orderstatusid") REFERENCES "orderstatus"("id");
ALTER TABLE "salesorder" ADD CONSTRAINT "salesorder_fk2" FOREIGN KEY ("ordertypeid") REFERENCES "ordertype"("id");

ALTER TABLE "ardoc" ADD CONSTRAINT "ardoc_fk0" FOREIGN KEY ("statusid") REFERENCES "docstatus"("id");
ALTER TABLE "ardoc" ADD CONSTRAINT "ardoc_fk1" FOREIGN KEY ("customeraccountid") REFERENCES "account"("accountid");
ALTER TABLE "ardoc" ADD CONSTRAINT "ardoc_fk2" FOREIGN KEY ("creditdocid") REFERENCES "ardoc"("docid");
ALTER TABLE "ardoc" ADD CONSTRAINT "ardoc_fk3" FOREIGN KEY ("doctypeid") REFERENCES "doctype"("id");

ALTER TABLE "resource" ADD CONSTRAINT "resource_fk0" FOREIGN KEY ("accountid") REFERENCES "account"("accountid");

ALTER TABLE "docdet" ADD CONSTRAINT "docdet_fk0" FOREIGN KEY ("docid") REFERENCES "ardoc"("docid");
ALTER TABLE "docdet" ADD CONSTRAINT "docdet_fk1" FOREIGN KEY ("durbillperiodtypeid") REFERENCES "periodtype"("id");
ALTER TABLE "docdet" ADD CONSTRAINT "docdet_fk2" FOREIGN KEY ("planperiodid") REFERENCES "planperiod"("planperiodid");
ALTER TABLE "docdet" ADD CONSTRAINT "docdet_fk3" FOREIGN KEY ("resourceid") REFERENCES "resource"("resourceid");
ALTER TABLE "docdet" ADD CONSTRAINT "docdet_fk4" FOREIGN KEY ("plancategoryid") REFERENCES "plancategory"("plancategoryid");
ALTER TABLE "docdet" ADD CONSTRAINT "docdet_fk5" FOREIGN KEY ("subscriptionid") REFERENCES "subscription"("subscriptionid");

ALTER TABLE "note" ADD CONSTRAINT "note_fk0" FOREIGN KEY ("accountid") REFERENCES "account"("accountid");

ALTER TABLE "orddet" ADD CONSTRAINT "orddet_fk0" FOREIGN KEY ("orderid") REFERENCES "salesorder"("orderid");
ALTER TABLE "orddet" ADD CONSTRAINT "orddet_fk1" FOREIGN KEY ("durbullperiodtypeid") REFERENCES "periodtype"("id");
ALTER TABLE "orddet" ADD CONSTRAINT "orddet_fk2" FOREIGN KEY ("plancategoryid") REFERENCES "plancategory"("plancategoryid");
ALTER TABLE "orddet" ADD CONSTRAINT "orddet_fk3" FOREIGN KEY ("subscriptionid") REFERENCES "subscription"("subscriptionid");
ALTER TABLE "orddet" ADD CONSTRAINT "orddet_fk4" FOREIGN KEY ("planperiodid") REFERENCES "planperiod"("planperiodid");
ALTER TABLE "orddet" ADD CONSTRAINT "orddet_fk5" FOREIGN KEY ("resourceid") REFERENCES "resource"("resourceid");

ALTER TABLE "plan" ADD CONSTRAINT "plan_fk0" FOREIGN KEY ("accountid") REFERENCES "account"("accountid");
ALTER TABLE "plan" ADD CONSTRAINT "plan_fk1" FOREIGN KEY ("billingperiodtypeid") REFERENCES "periodtype"("id");

ALTER TABLE "plancategory" ADD CONSTRAINT "plancategory_fk0" FOREIGN KEY ("accountid") REFERENCES "account"("accountid");

ALTER TABLE "planperiod" ADD CONSTRAINT "planperiod_fk0" FOREIGN KEY ("planid") REFERENCES "plan"("planid");
ALTER TABLE "planperiod" ADD CONSTRAINT "planperiod_fk1" FOREIGN KEY ("periodtypeid") REFERENCES "periodtype"("id");

ALTER TABLE "planrate" ADD CONSTRAINT "planrate_fk0" FOREIGN KEY ("planid") REFERENCES "plan"("planid");
ALTER TABLE "planrate" ADD CONSTRAINT "planrate_fk1" FOREIGN KEY ("resourceid") REFERENCES "resource"("resourceid");

ALTER TABLE "salesperson" ADD CONSTRAINT "salesperson_fk0" FOREIGN KEY ("vendoraccountid") REFERENCES "account"("accountid");

ALTER TABLE "subscrparam" ADD CONSTRAINT "subscrparam_fk0" FOREIGN KEY ("subscriptionid") REFERENCES "subscription"("subscriptionid");
ALTER TABLE "subscrparam" ADD CONSTRAINT "subscrparam_fk1" FOREIGN KEY ("resourceid") REFERENCES "resource"("resourceid");

ALTER TABLE "subscription" ADD CONSTRAINT "subscription_fk0" FOREIGN KEY ("statusid") REFERENCES "substatus"("id");
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_fk1" FOREIGN KEY ("accountid") REFERENCES "account"("accountid");
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_fk2" FOREIGN KEY ("planid") REFERENCES "plan"("planid");
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_fk3" FOREIGN KEY ("periodtypeid") REFERENCES "periodtype"("id");
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_fk4" FOREIGN KEY ("billingperiodtypeid") REFERENCES "periodtype"("id");







