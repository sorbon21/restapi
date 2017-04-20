--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE account (
    accountid integer NOT NULL,
    vendoraccountid integer NOT NULL,
    typeid integer NOT NULL,
    statusid integer NOT NULL,
    creationdate date NOT NULL,
    companyname character varying(120),
    address1 character varying(80) NOT NULL,
    address2 character varying(80),
    city character varying(40) NOT NULL,
    state character varying(80) NOT NULL,
    zip character varying(10) NOT NULL,
    countryid character varying(2) NOT NULL
);


ALTER TABLE account OWNER TO postgres;

--
-- Name: account_accountid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE account_accountid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE account_accountid_seq OWNER TO postgres;

--
-- Name: account_accountid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE account_accountid_seq OWNED BY account.accountid;


--
-- Name: accountstatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE accountstatus (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE accountstatus OWNER TO postgres;

--
-- Name: ardoc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE ardoc (
    docid integer NOT NULL,
    docnum character varying(20) NOT NULL,
    statusid integer NOT NULL,
    total_value double precision NOT NULL,
    customeraccountid integer NOT NULL,
    docdate date NOT NULL,
    description text NOT NULL,
    salesid character varying(80),
    creditdocid integer NOT NULL,
    doctypeid integer NOT NULL
);


ALTER TABLE ardoc OWNER TO postgres;

--
-- Name: ardoc_docid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE ardoc_docid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ardoc_docid_seq OWNER TO postgres;

--
-- Name: ardoc_docid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE ardoc_docid_seq OWNED BY ardoc.docid;


--
-- Name: autch; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE autch (
    id integer NOT NULL,
    name text,
    login text,
    password text,
    id_status integer
);


ALTER TABLE autch OWNER TO postgres;

--
-- Name: autch_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE autch_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE autch_id_seq OWNER TO postgres;

--
-- Name: autch_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE autch_id_seq OWNED BY autch.id;


--
-- Name: autch_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE autch_status (
    id integer NOT NULL,
    name text
);


ALTER TABLE autch_status OWNER TO postgres;

--
-- Name: autch_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE autch_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE autch_status_id_seq OWNER TO postgres;

--
-- Name: autch_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE autch_status_id_seq OWNED BY autch_status.id;


--
-- Name: docdet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE docdet (
    detid integer NOT NULL,
    docid integer NOT NULL,
    unitprice_value double precision NOT NULL,
    extendedprice_value double precision NOT NULL,
    servqty double precision NOT NULL,
    duration double precision NOT NULL,
    durbillperiod integer NOT NULL,
    durbillperiodtypeid integer NOT NULL,
    planperiodid integer NOT NULL,
    resourceid integer,
    discountamt_value double precision NOT NULL,
    plancategoryid integer NOT NULL,
    ddorddetid integer NOT NULL,
    ddorderid integer NOT NULL,
    subscriptionid integer NOT NULL,
    descr character varying(255) NOT NULL
);


ALTER TABLE docdet OWNER TO postgres;

--
-- Name: docdet_detid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE docdet_detid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE docdet_detid_seq OWNER TO postgres;

--
-- Name: docdet_detid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE docdet_detid_seq OWNED BY docdet.detid;


--
-- Name: docstatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE docstatus (
    id integer NOT NULL,
    name character varying(40) NOT NULL
);


ALTER TABLE docstatus OWNER TO postgres;

--
-- Name: doctype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE doctype (
    id integer NOT NULL,
    name character varying(40) NOT NULL
);


ALTER TABLE doctype OWNER TO postgres;

--
-- Name: note; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE note (
    noteid integer NOT NULL,
    shortdescr character varying(100),
    creationdate timestamp without time zone NOT NULL,
    accountid integer NOT NULL,
    description text
);


ALTER TABLE note OWNER TO postgres;

--
-- Name: note_noteid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE note_noteid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE note_noteid_seq OWNER TO postgres;

--
-- Name: note_noteid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE note_noteid_seq OWNED BY note.noteid;


--
-- Name: orddet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE orddet (
    detid integer NOT NULL,
    orderid integer NOT NULL,
    unitprice_value double precision NOT NULL,
    servqty double precision NOT NULL,
    duration double precision NOT NULL,
    durbilperiod integer NOT NULL,
    durbullperiodtypeid integer NOT NULL,
    discountamt_value double precision NOT NULL,
    extendedprice_value double precision NOT NULL,
    plancategoryid integer NOT NULL,
    subscriptionid integer,
    planperiodid integer NOT NULL,
    resourceid integer,
    descr character varying(4096) NOT NULL
);


ALTER TABLE orddet OWNER TO postgres;

--
-- Name: orddet_detid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE orddet_detid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE orddet_detid_seq OWNER TO postgres;

--
-- Name: orddet_detid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE orddet_detid_seq OWNED BY orddet.detid;


--
-- Name: orderstatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE orderstatus (
    id character varying(2) NOT NULL,
    name character varying(40) NOT NULL
);


ALTER TABLE orderstatus OWNER TO postgres;

--
-- Name: ordertype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE ordertype (
    id character varying(2) NOT NULL,
    name character varying(40) NOT NULL
);


ALTER TABLE ordertype OWNER TO postgres;

--
-- Name: periodtype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE periodtype (
    id integer NOT NULL,
    name character varying(40) NOT NULL
);


ALTER TABLE periodtype OWNER TO postgres;

--
-- Name: plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE plan (
    planid integer NOT NULL,
    name character varying(250) NOT NULL,
    plancategoryid integer NOT NULL,
    shortdescription text NOT NULL,
    longdescription text NOT NULL,
    accountid integer NOT NULL,
    billingperiodtypeid integer NOT NULL,
    billingperiod integer NOT NULL,
    isautorenew boolean NOT NULL,
    reneworderinterval integer NOT NULL
);


ALTER TABLE plan OWNER TO postgres;

--
-- Name: plan_planid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE plan_planid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE plan_planid_seq OWNER TO postgres;

--
-- Name: plan_planid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE plan_planid_seq OWNED BY plan.planid;


--
-- Name: plancategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE plancategory (
    plancategoryid integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    accountid integer NOT NULL
);


ALTER TABLE plancategory OWNER TO postgres;

--
-- Name: plancategory_plancategoryid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE plancategory_plancategoryid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE plancategory_plancategoryid_seq OWNER TO postgres;

--
-- Name: plancategory_plancategoryid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE plancategory_plancategoryid_seq OWNED BY plancategory.plancategoryid;


--
-- Name: planperiod; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE planperiod (
    planperiodid integer NOT NULL,
    planid integer NOT NULL,
    period integer NOT NULL,
    periodtypeid integer NOT NULL,
    setupfee double precision NOT NULL,
    subscriptionfee double precision NOT NULL,
    renewalfee double precision NOT NULL
);


ALTER TABLE planperiod OWNER TO postgres;

--
-- Name: planperiod_planperiodid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE planperiod_planperiodid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE planperiod_planperiodid_seq OWNER TO postgres;

--
-- Name: planperiod_planperiodid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE planperiod_planperiodid_seq OWNED BY planperiod.planperiodid;


--
-- Name: planrate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE planrate (
    planrateid integer NOT NULL,
    planid integer NOT NULL,
    resourceid integer NOT NULL,
    setupfee double precision NOT NULL,
    recurringfee double precision NOT NULL,
    costforadditional double precision NOT NULL,
    includedvalue double precision NOT NULL,
    maxvalue double precision NOT NULL
);


ALTER TABLE planrate OWNER TO postgres;

--
-- Name: planrate_planrateid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE planrate_planrateid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE planrate_planrateid_seq OWNER TO postgres;

--
-- Name: planrate_planrateid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE planrate_planrateid_seq OWNED BY planrate.planrateid;


--
-- Name: resource; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE resource (
    resourceid integer NOT NULL,
    name character varying(250) NOT NULL,
    description text NOT NULL,
    accountid integer NOT NULL
);


ALTER TABLE resource OWNER TO postgres;

--
-- Name: resource_resourceid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE resource_resourceid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE resource_resourceid_seq OWNER TO postgres;

--
-- Name: resource_resourceid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE resource_resourceid_seq OWNED BY resource.resourceid;


--
-- Name: salesorder; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE salesorder (
    orderid integer NOT NULL,
    customeraccountid integer NOT NULL,
    ordernbr character varying(255) NOT NULL,
    orderstatusid character varying(2) NOT NULL,
    ordertypeid character varying(2) NOT NULL,
    docdate timestamp without time zone NOT NULL,
    total_value double precision NOT NULL,
    descr character varying(255) NOT NULL,
    salesid character varying(255) NOT NULL
);


ALTER TABLE salesorder OWNER TO postgres;

--
-- Name: salesorder_orderid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE salesorder_orderid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE salesorder_orderid_seq OWNER TO postgres;

--
-- Name: salesorder_orderid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE salesorder_orderid_seq OWNED BY salesorder.orderid;


--
-- Name: salesperson; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE salesperson (
    salesid character varying(255) NOT NULL,
    vendoraccountid integer NOT NULL,
    name character varying(255) NOT NULL,
    salescommission double precision NOT NULL,
    recurringcommission double precision NOT NULL
);


ALTER TABLE salesperson OWNER TO postgres;

--
-- Name: subscription; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE subscription (
    subscriptionid integer NOT NULL,
    subscriptionname character varying(255) NOT NULL,
    statusid integer NOT NULL,
    startdate timestamp without time zone NOT NULL,
    expirationdate timestamp without time zone NOT NULL,
    shutdowndate timestamp without time zone NOT NULL,
    terminationdate timestamp without time zone NOT NULL,
    accountid integer NOT NULL,
    planid integer NOT NULL,
    period integer NOT NULL,
    periodtypeid integer NOT NULL,
    billingperiodtypeid integer NOT NULL,
    billingperiod integer NOT NULL,
    lastbilldate timestamp without time zone NOT NULL,
    nextbilldate timestamp without time zone NOT NULL,
    isautorenew boolean NOT NULL,
    reneworderinterval integer NOT NULL,
    setupfee double precision NOT NULL,
    subscriptionfee double precision NOT NULL,
    renewalfee double precision NOT NULL
);


ALTER TABLE subscription OWNER TO postgres;

--
-- Name: subscription_subscriptionid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE subscription_subscriptionid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE subscription_subscriptionid_seq OWNER TO postgres;

--
-- Name: subscription_subscriptionid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE subscription_subscriptionid_seq OWNED BY subscription.subscriptionid;


--
-- Name: subscrparam; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE subscrparam (
    subscriptionid integer NOT NULL,
    resourceid integer NOT NULL,
    includedvalue double precision NOT NULL,
    amount double precision NOT NULL,
    maxvalue double precision NOT NULL,
    setupfee double precision NOT NULL,
    recurringfee double precision NOT NULL,
    costforadditional double precision NOT NULL
);


ALTER TABLE subscrparam OWNER TO postgres;

--
-- Name: substatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE substatus (
    id integer NOT NULL,
    name character varying(40) NOT NULL
);


ALTER TABLE substatus OWNER TO postgres;

--
-- Name: accountid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account ALTER COLUMN accountid SET DEFAULT nextval('account_accountid_seq'::regclass);


--
-- Name: docid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ardoc ALTER COLUMN docid SET DEFAULT nextval('ardoc_docid_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY autch ALTER COLUMN id SET DEFAULT nextval('autch_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY autch_status ALTER COLUMN id SET DEFAULT nextval('autch_status_id_seq'::regclass);


--
-- Name: detid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY docdet ALTER COLUMN detid SET DEFAULT nextval('docdet_detid_seq'::regclass);


--
-- Name: noteid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY note ALTER COLUMN noteid SET DEFAULT nextval('note_noteid_seq'::regclass);


--
-- Name: detid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orddet ALTER COLUMN detid SET DEFAULT nextval('orddet_detid_seq'::regclass);


--
-- Name: planid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY plan ALTER COLUMN planid SET DEFAULT nextval('plan_planid_seq'::regclass);


--
-- Name: plancategoryid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY plancategory ALTER COLUMN plancategoryid SET DEFAULT nextval('plancategory_plancategoryid_seq'::regclass);


--
-- Name: planperiodid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY planperiod ALTER COLUMN planperiodid SET DEFAULT nextval('planperiod_planperiodid_seq'::regclass);


--
-- Name: planrateid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY planrate ALTER COLUMN planrateid SET DEFAULT nextval('planrate_planrateid_seq'::regclass);


--
-- Name: resourceid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY resource ALTER COLUMN resourceid SET DEFAULT nextval('resource_resourceid_seq'::regclass);


--
-- Name: orderid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY salesorder ALTER COLUMN orderid SET DEFAULT nextval('salesorder_orderid_seq'::regclass);


--
-- Name: subscriptionid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subscription ALTER COLUMN subscriptionid SET DEFAULT nextval('subscription_subscriptionid_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY account (accountid, vendoraccountid, typeid, statusid, creationdate, companyname, address1, address2, city, state, zip, countryid) FROM stdin;
1001	1001	1	1	2017-04-08	test	test		test	test	123	er
\.


--
-- Name: account_accountid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('account_accountid_seq', 1, false);


--
-- Data for Name: accountstatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY accountstatus (id, name) FROM stdin;
1	Active
\.


--
-- Data for Name: ardoc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ardoc (docid, docnum, statusid, total_value, customeraccountid, docdate, description, salesid, creditdocid, doctypeid) FROM stdin;
\.


--
-- Name: ardoc_docid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('ardoc_docid_seq', 1, false);


--
-- Data for Name: autch; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY autch (id, name, login, password, id_status) FROM stdin;
\.


--
-- Name: autch_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('autch_id_seq', 1, false);


--
-- Data for Name: autch_status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY autch_status (id, name) FROM stdin;
1	Admin
2	User
\.


--
-- Name: autch_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('autch_status_id_seq', 2, true);


--
-- Data for Name: docdet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY docdet (detid, docid, unitprice_value, extendedprice_value, servqty, duration, durbillperiod, durbillperiodtypeid, planperiodid, resourceid, discountamt_value, plancategoryid, ddorddetid, ddorderid, subscriptionid, descr) FROM stdin;
\.


--
-- Name: docdet_detid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('docdet_detid_seq', 1, false);


--
-- Data for Name: docstatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY docstatus (id, name) FROM stdin;
1	232
2	HELLO
\.


--
-- Data for Name: doctype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY doctype (id, name) FROM stdin;
\.


--
-- Data for Name: note; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY note (noteid, shortdescr, creationdate, accountid, description) FROM stdin;
\.


--
-- Name: note_noteid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('note_noteid_seq', 1, false);


--
-- Data for Name: orddet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY orddet (detid, orderid, unitprice_value, servqty, duration, durbilperiod, durbullperiodtypeid, discountamt_value, extendedprice_value, plancategoryid, subscriptionid, planperiodid, resourceid, descr) FROM stdin;
\.


--
-- Name: orddet_detid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('orddet_detid_seq', 1, false);


--
-- Data for Name: orderstatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY orderstatus (id, name) FROM stdin;
CP	Completed
\.


--
-- Data for Name: ordertype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ordertype (id, name) FROM stdin;
SO	Sales Order
\.


--
-- Data for Name: periodtype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY periodtype (id, name) FROM stdin;
1	month
\.


--
-- Data for Name: plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY plan (planid, name, plancategoryid, shortdescription, longdescription, accountid, billingperiodtypeid, billingperiod, isautorenew, reneworderinterval) FROM stdin;
1	test	1	test	test	1001	1	1	t	10
\.


--
-- Name: plan_planid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('plan_planid_seq', 1, true);


--
-- Data for Name: plancategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY plancategory (plancategoryid, name, description, accountid) FROM stdin;
1	test	test	1001
\.


--
-- Name: plancategory_plancategoryid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('plancategory_plancategoryid_seq', 1, true);


--
-- Data for Name: planperiod; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY planperiod (planperiodid, planid, period, periodtypeid, setupfee, subscriptionfee, renewalfee) FROM stdin;
\.


--
-- Name: planperiod_planperiodid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('planperiod_planperiodid_seq', 3, true);


--
-- Data for Name: planrate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY planrate (planrateid, planid, resourceid, setupfee, recurringfee, costforadditional, includedvalue, maxvalue) FROM stdin;
\.


--
-- Name: planrate_planrateid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('planrate_planrateid_seq', 1, false);


--
-- Data for Name: resource; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY resource (resourceid, name, description, accountid) FROM stdin;
\.


--
-- Name: resource_resourceid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('resource_resourceid_seq', 1, false);


--
-- Data for Name: salesorder; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY salesorder (orderid, customeraccountid, ordernbr, orderstatusid, ordertypeid, docdate, total_value, descr, salesid) FROM stdin;
3	1001	SO000001	CP	SO	2017-04-09 00:00:00	1000	test	test
\.


--
-- Name: salesorder_orderid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('salesorder_orderid_seq', 3, true);


--
-- Data for Name: salesperson; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY salesperson (salesid, vendoraccountid, name, salescommission, recurringcommission) FROM stdin;
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY subscription (subscriptionid, subscriptionname, statusid, startdate, expirationdate, shutdowndate, terminationdate, accountid, planid, period, periodtypeid, billingperiodtypeid, billingperiod, lastbilldate, nextbilldate, isautorenew, reneworderinterval, setupfee, subscriptionfee, renewalfee) FROM stdin;
\.


--
-- Name: subscription_subscriptionid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('subscription_subscriptionid_seq', 1, false);


--
-- Data for Name: subscrparam; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY subscrparam (subscriptionid, resourceid, includedvalue, amount, maxvalue, setupfee, recurringfee, costforadditional) FROM stdin;
\.


--
-- Data for Name: substatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY substatus (id, name) FROM stdin;
\.


--
-- Name: account_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_pk PRIMARY KEY (accountid);


--
-- Name: accountstatus_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY accountstatus
    ADD CONSTRAINT accountstatus_pk PRIMARY KEY (id);


--
-- Name: ardoc_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ardoc
    ADD CONSTRAINT ardoc_pk PRIMARY KEY (docid);


--
-- Name: autch_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY autch
    ADD CONSTRAINT autch_pkey PRIMARY KEY (id);


--
-- Name: autch_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY autch_status
    ADD CONSTRAINT autch_status_pkey PRIMARY KEY (id);


--
-- Name: docdet_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY docdet
    ADD CONSTRAINT docdet_pk PRIMARY KEY (detid);


--
-- Name: docstatus_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY docstatus
    ADD CONSTRAINT docstatus_pk PRIMARY KEY (id);


--
-- Name: doctype_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY doctype
    ADD CONSTRAINT doctype_pk PRIMARY KEY (id);


--
-- Name: note_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY note
    ADD CONSTRAINT note_pk PRIMARY KEY (noteid);


--
-- Name: orddet_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orddet
    ADD CONSTRAINT orddet_pk PRIMARY KEY (detid);


--
-- Name: orderstatus_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orderstatus
    ADD CONSTRAINT orderstatus_pk PRIMARY KEY (id);


--
-- Name: ordertype_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ordertype
    ADD CONSTRAINT ordertype_pk PRIMARY KEY (id);


--
-- Name: periodtype_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY periodtype
    ADD CONSTRAINT periodtype_pk PRIMARY KEY (id);


--
-- Name: plan_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY plan
    ADD CONSTRAINT plan_pk PRIMARY KEY (planid);


--
-- Name: plancategory_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY plancategory
    ADD CONSTRAINT plancategory_pk PRIMARY KEY (plancategoryid);


--
-- Name: planperiod_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY planperiod
    ADD CONSTRAINT planperiod_pk PRIMARY KEY (planperiodid);


--
-- Name: planrate_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY planrate
    ADD CONSTRAINT planrate_pk PRIMARY KEY (planrateid);


--
-- Name: resource_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY resource
    ADD CONSTRAINT resource_pk PRIMARY KEY (resourceid);


--
-- Name: salesorder_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY salesorder
    ADD CONSTRAINT salesorder_pk PRIMARY KEY (orderid);


--
-- Name: salesperson_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY salesperson
    ADD CONSTRAINT salesperson_pk PRIMARY KEY (salesid);


--
-- Name: subscription_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subscription
    ADD CONSTRAINT subscription_pk PRIMARY KEY (subscriptionid);


--
-- Name: subscrparam_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subscrparam
    ADD CONSTRAINT subscrparam_pk PRIMARY KEY (subscriptionid, resourceid);


--
-- Name: substatus_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY substatus
    ADD CONSTRAINT substatus_pk PRIMARY KEY (id);


--
-- Name: account_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_fk0 FOREIGN KEY (vendoraccountid) REFERENCES account(accountid);


--
-- Name: account_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_fk1 FOREIGN KEY (statusid) REFERENCES accountstatus(id);


--
-- Name: ardoc_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ardoc
    ADD CONSTRAINT ardoc_fk0 FOREIGN KEY (statusid) REFERENCES docstatus(id);


--
-- Name: ardoc_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ardoc
    ADD CONSTRAINT ardoc_fk1 FOREIGN KEY (customeraccountid) REFERENCES account(accountid);


--
-- Name: ardoc_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ardoc
    ADD CONSTRAINT ardoc_fk2 FOREIGN KEY (creditdocid) REFERENCES ardoc(docid);


--
-- Name: ardoc_fk3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ardoc
    ADD CONSTRAINT ardoc_fk3 FOREIGN KEY (doctypeid) REFERENCES doctype(id);


--
-- Name: autch_id_status_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY autch
    ADD CONSTRAINT autch_id_status_fkey FOREIGN KEY (id_status) REFERENCES autch_status(id);


--
-- Name: docdet_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY docdet
    ADD CONSTRAINT docdet_fk0 FOREIGN KEY (docid) REFERENCES ardoc(docid);


--
-- Name: docdet_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY docdet
    ADD CONSTRAINT docdet_fk1 FOREIGN KEY (durbillperiodtypeid) REFERENCES periodtype(id);


--
-- Name: docdet_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY docdet
    ADD CONSTRAINT docdet_fk2 FOREIGN KEY (planperiodid) REFERENCES planperiod(planperiodid);


--
-- Name: docdet_fk3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY docdet
    ADD CONSTRAINT docdet_fk3 FOREIGN KEY (resourceid) REFERENCES resource(resourceid);


--
-- Name: docdet_fk4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY docdet
    ADD CONSTRAINT docdet_fk4 FOREIGN KEY (plancategoryid) REFERENCES plancategory(plancategoryid);


--
-- Name: docdet_fk5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY docdet
    ADD CONSTRAINT docdet_fk5 FOREIGN KEY (subscriptionid) REFERENCES subscription(subscriptionid);


--
-- Name: note_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY note
    ADD CONSTRAINT note_fk0 FOREIGN KEY (accountid) REFERENCES account(accountid);


--
-- Name: orddet_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orddet
    ADD CONSTRAINT orddet_fk0 FOREIGN KEY (orderid) REFERENCES salesorder(orderid);


--
-- Name: orddet_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orddet
    ADD CONSTRAINT orddet_fk1 FOREIGN KEY (durbullperiodtypeid) REFERENCES periodtype(id);


--
-- Name: orddet_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orddet
    ADD CONSTRAINT orddet_fk2 FOREIGN KEY (plancategoryid) REFERENCES plancategory(plancategoryid);


--
-- Name: orddet_fk3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orddet
    ADD CONSTRAINT orddet_fk3 FOREIGN KEY (subscriptionid) REFERENCES subscription(subscriptionid);


--
-- Name: orddet_fk4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orddet
    ADD CONSTRAINT orddet_fk4 FOREIGN KEY (planperiodid) REFERENCES planperiod(planperiodid);


--
-- Name: orddet_fk5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orddet
    ADD CONSTRAINT orddet_fk5 FOREIGN KEY (resourceid) REFERENCES resource(resourceid);


--
-- Name: plan_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY plan
    ADD CONSTRAINT plan_fk0 FOREIGN KEY (accountid) REFERENCES account(accountid);


--
-- Name: plan_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY plan
    ADD CONSTRAINT plan_fk1 FOREIGN KEY (billingperiodtypeid) REFERENCES periodtype(id);


--
-- Name: plancategory_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY plancategory
    ADD CONSTRAINT plancategory_fk0 FOREIGN KEY (accountid) REFERENCES account(accountid);


--
-- Name: planperiod_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY planperiod
    ADD CONSTRAINT planperiod_fk0 FOREIGN KEY (planid) REFERENCES plan(planid);


--
-- Name: planperiod_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY planperiod
    ADD CONSTRAINT planperiod_fk1 FOREIGN KEY (periodtypeid) REFERENCES periodtype(id);


--
-- Name: planrate_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY planrate
    ADD CONSTRAINT planrate_fk0 FOREIGN KEY (planid) REFERENCES plan(planid);


--
-- Name: planrate_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY planrate
    ADD CONSTRAINT planrate_fk1 FOREIGN KEY (resourceid) REFERENCES resource(resourceid);


--
-- Name: resource_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY resource
    ADD CONSTRAINT resource_fk0 FOREIGN KEY (accountid) REFERENCES account(accountid);


--
-- Name: salesorder_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY salesorder
    ADD CONSTRAINT salesorder_fk0 FOREIGN KEY (customeraccountid) REFERENCES account(accountid);


--
-- Name: salesorder_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY salesorder
    ADD CONSTRAINT salesorder_fk1 FOREIGN KEY (orderstatusid) REFERENCES orderstatus(id);


--
-- Name: salesorder_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY salesorder
    ADD CONSTRAINT salesorder_fk2 FOREIGN KEY (ordertypeid) REFERENCES ordertype(id);


--
-- Name: salesperson_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY salesperson
    ADD CONSTRAINT salesperson_fk0 FOREIGN KEY (vendoraccountid) REFERENCES account(accountid);


--
-- Name: subscription_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subscription
    ADD CONSTRAINT subscription_fk0 FOREIGN KEY (statusid) REFERENCES substatus(id);


--
-- Name: subscription_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subscription
    ADD CONSTRAINT subscription_fk1 FOREIGN KEY (accountid) REFERENCES account(accountid);


--
-- Name: subscription_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subscription
    ADD CONSTRAINT subscription_fk2 FOREIGN KEY (planid) REFERENCES plan(planid);


--
-- Name: subscription_fk3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subscription
    ADD CONSTRAINT subscription_fk3 FOREIGN KEY (periodtypeid) REFERENCES periodtype(id);


--
-- Name: subscription_fk4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subscription
    ADD CONSTRAINT subscription_fk4 FOREIGN KEY (billingperiodtypeid) REFERENCES periodtype(id);


--
-- Name: subscrparam_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subscrparam
    ADD CONSTRAINT subscrparam_fk0 FOREIGN KEY (subscriptionid) REFERENCES subscription(subscriptionid);


--
-- Name: subscrparam_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subscrparam
    ADD CONSTRAINT subscrparam_fk1 FOREIGN KEY (resourceid) REFERENCES resource(resourceid);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

