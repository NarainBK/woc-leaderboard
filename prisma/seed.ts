import prisma from "@/app/db"

async function seedParticipants() {
  const participants = [
    {
      fullName: "Ritesh Koushik",
      rollNumber: "CB.EN.U4CSE22038",
      mobileNumber: "9999999998",
      username: "IAmRiteshKoushik",
      bounty: 100,
    },
    {
      fullName: "Abhinav R",
      rollNumber: "CB.EN.U4CSE21001",
      mobileNumber: "9999999997",
      username: "Abhinav-Ark",
      bounty: 200,
    },
    {
      fullName: "Ashwin Narayanan S",
      rollNumber: "CB.EN.U4CSE21008",
      mobileNumber: "9999999996",
      username: "Ashrockzzz2003",
      bounty: 150,
    },
    {
      fullName: "Vijay SB",
      rollNumber: "CB.SC.U4CSE23249",
      mobileNumber: "9999999995",
      username: "vijaysb0613",
      bounty: 50,
    },
    {
      fullName: "Kiran Rajeev KV",
      rollNumber: "CB.SC.U4CSE23624",
      mobileNumber: "9999999994",
      username: "KiranRajeev-KV",
      bounty: 50,
    }
  ]

  if (process.env.NODE_ENVIRONMENT === "development") {
    await prisma.participant.createMany({
      data: participants,
    });
  }
}

seedParticipants();
