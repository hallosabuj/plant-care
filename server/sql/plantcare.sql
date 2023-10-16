-- Active: 1688064963051@@127.0.0.1@3306@plantcare
-- Command to find list of plants that uses a fertilizer
SELECT IFNULL(plants.plantId,''),IFNULL(plants.name,''),IFNULL(plants.profileImage,''),IFNULL(plants.applyInterval,''), IFNULL(applied.appliedDate,''), IFNULL(plants.numberId,'') from (
    SELECT n.plantId as plantId,p.name as name,p.profileImage as profileImage, n.applyInterval as applyInterval, p.numberId as numberId
    from neededfertilizers n, plants p 
    where n.plantId=p.plantId and n.fertilizerId="1234"
) plants LEFT JOIN (
    SELECT plantId, MAX(appliedDate) appliedDate FROM appliedfertilizer 
    where fertilizerId="1234" GROUP BY plantId 
) applied
on plants.plantId=applied.plantId;