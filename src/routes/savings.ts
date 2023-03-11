import Express from "express";

export default (req: Express.Request, res: Express.Response) => {
    const currentDate = new Date(Number.parseInt(req.query.startDate as string || "1667304000000"));
    const now = new Date();
    
    const target = Number.parseFloat(req.query.target as string || "314.95");
    const allowance = Number.parseFloat(req.query.allowance as string || "15");
    const birthdayMoney = Number.parseFloat(req.query.birthdayMoney as string || "50");

    let savedUp = 0;
    let savedUpRightNow = 0;

    while (savedUp < target) {
        currentDate.setDate(currentDate.getDate() + 1);

        if (currentDate.getDate() == 1) savedUp += allowance;
        if (currentDate.getDate() == 22 && currentDate.getMonth() == 8) savedUp += birthdayMoney;

        if (currentDate.getFullYear() == now.getFullYear() && currentDate.getMonth() == now.getMonth() && currentDate.getDate() == now.getDate()) savedUpRightNow = savedUp;
    }

    res.send({
        date: currentDate.toString(),
        savedUp: savedUp,
        savedUpRightNow: savedUpRightNow
    });
}