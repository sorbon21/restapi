
-------------------------------

SELECT * FROM salesperson WHERE salesperson.salesid;


-----------------------------


INSERT INTO subscription (subscriptionname, statusid, startdate, expirationdate, shutdowndate, terminationdate, accountid, planid, period, periodtypeid, billingperiodtypeid, billingperiod, lastbilldate, nextbilldate, isautorenew, reneworderinterval, setupfee, subscriptionfee, renewalfee)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18);[r.subscriptionname, r.statusid, r.startdate, r.expirationdate, r.shutdowndate, r.terminationdate, r.accountid, r.planid, r.period, r.periodtypeid, r.billingperiodtypeid, r.billingperiod, r.lastbilldate, r.nextbilldate, r.isautorenew, r.reneworderinterval, r.setupfee, r.subscriptionfee, r.renewalfee]


UPDATE subscription
SET   subscriptionname, statusid, startdate, expirationdate, shutdowndate, terminationdate, accountid, planid, period, periodtypeid, billingperiodtypeid, billingperiod, lastbilldate, nextbilldate, isautorenew, reneworderinterval, setupfee, subscriptionfee, renewalfee
WHERE subscription.subscriptionid;
SELECT *
FROM subscription
WHERE subscription.subscriptionid;

