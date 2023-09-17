SELECT n.plantId as plantId,p.name as name,p.profileImage as profileImage, n.applyInterval as applyInterval
from neededfertilizers n, plants p 
where n.plantId=p.plantId and n.fertilizerId="1b8ee84f-f09e-4678-85ea-4f7005c3cdb5";

SELECT plantId, appliedDate FROM appliedfertilizer 
where fertilizerId="1b8ee84f-f09e-4678-85ea-4f7005c3cdb5";

-- Command to find list of plants that uses a fertilizer
SELECT plants.plantId,plants.name,plants.profileImage,plants.applyInterval, IFNULL(applied.appliedDate,'') from (
    SELECT n.plantId as plantId,p.name as name,p.profileImage as profileImage, n.applyInterval as applyInterval
    from neededfertilizers n, plants p 
    where n.plantId=p.plantId and n.fertilizerId="fefbc571-3be0-42d2-9beb-6c640383f5a2"
) plants LEFT JOIN (
    SELECT plantId, MAX(appliedDate) appliedDate FROM appliedfertilizer 
    where fertilizerId="fefbc571-3be0-42d2-9beb-6c640383f5a2" GROUP BY plantId
) applied
on plants.plantId=applied.plantId;

SELECT IFNULL(plants.plantId,''),IFNULL(plants.name,''),IFNULL(plants.profileImage,''),IFNULL(plants.applyInterval,''), IFNULL(applied.appliedDate,''), IFNULL(plants.numberId,'') from (
    SELECT n.plantId as plantId,p.name as name,p.profileImage as profileImage, n.applyInterval as applyInterval, p.numberId as numberId
    from neededfertilizers n, plants p 
    where n.plantId=p.plantId and n.fertilizerId="1234"
) plants LEFT JOIN (
    SELECT plantId, MAX(appliedDate) appliedDate FROM appliedfertilizer 
    where fertilizerId="1234" GROUP BY plantId 
) applied
on plants.plantId=applied.plantId;