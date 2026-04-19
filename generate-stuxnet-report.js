const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
  size: 'A4',
  bufferPages: true,
  margins: { top: 60, bottom: 60, left: 60, right: 60 },
  info: {
    Title: 'Stuxnet: A Comprehensive Cyber Weapon Analysis',
    Author: 'Senan Adigozelov',
    Subject: 'Cybersecurity Report - Stuxnet Worm Analysis',
    Keywords: 'Stuxnet, cyber weapon, SCADA, ICS, malware, Iran, nuclear',
  },
});

const stream = fs.createWriteStream('reports/Stuxnet_Report.pdf');
doc.pipe(stream);

// Colors
const PRIMARY = '#1a1a2e';
const ACCENT = '#e94560';
const SECONDARY = '#16213e';
const TEXT_COLOR = '#2c2c2c';
const LIGHT_GRAY = '#f0f0f0';

// Helper functions
function addHeader(text, size = 22) {
  doc
    .font('Helvetica-Bold')
    .fontSize(size)
    .fillColor(PRIMARY)
    .text(text, { align: 'left' });
  doc.moveDown(0.3);
  // Draw accent line
  doc
    .moveTo(doc.x, doc.y)
    .lineTo(doc.x + 475, doc.y)
    .strokeColor(ACCENT)
    .lineWidth(2)
    .stroke();
  doc.moveDown(0.6);
}

function addSubHeader(text, size = 16) {
  doc
    .font('Helvetica-Bold')
    .fontSize(size)
    .fillColor(SECONDARY)
    .text(text, { align: 'left' });
  doc.moveDown(0.3);
}

function addParagraph(text) {
  doc
    .font('Helvetica')
    .fontSize(11)
    .fillColor(TEXT_COLOR)
    .text(text, { align: 'justify', lineGap: 4 });
  doc.moveDown(0.5);
}

function addBullet(text) {
  const x = doc.x;
  doc
    .font('Helvetica')
    .fontSize(11)
    .fillColor(ACCENT)
    .text('\u2022 ', { continued: true })
    .fillColor(TEXT_COLOR)
    .text(text, { align: 'left', lineGap: 3 });
  doc.moveDown(0.2);
}

function addInfoBox(text) {
  const boxX = 60;
  const boxY = doc.y;
  const boxWidth = 475;
  doc
    .roundedRect(boxX, boxY, boxWidth, 0, 5)
    .fill(LIGHT_GRAY);

  // Measure text height first
  const textHeight = doc.heightOfString(text, {
    width: boxWidth - 30,
    align: 'left',
  });

  // Redraw box with correct height
  doc
    .roundedRect(boxX, boxY, boxWidth, textHeight + 20, 5)
    .fill(LIGHT_GRAY);

  // Left accent bar
  doc
    .rect(boxX, boxY, 4, textHeight + 20)
    .fill(ACCENT);

  doc
    .font('Helvetica-Oblique')
    .fontSize(10)
    .fillColor(TEXT_COLOR)
    .text(text, boxX + 18, boxY + 10, {
      width: boxWidth - 30,
      align: 'left',
      lineGap: 3,
    });

  doc.y = boxY + textHeight + 30;
  doc.moveDown(0.3);
}

function checkPageSpace(needed = 120) {
  if (doc.y + needed > doc.page.height - 80) {
    doc.addPage();
  }
}

function addPageNumber() {
  const pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i);
    doc
      .font('Helvetica')
      .fontSize(9)
      .fillColor('#999999')
      .text(
        `Page ${i + 1} of ${pages.count}`,
        0,
        doc.page.height - 40,
        { align: 'center' }
      );
  }
}

// ============================================================
// COVER PAGE
// ============================================================

doc.rect(0, 0, 595, 842).fill(PRIMARY);

// Title area
doc
  .font('Helvetica-Bold')
  .fontSize(42)
  .fillColor('#ffffff')
  .text('STUXNET', 60, 200, { align: 'center' });

doc.moveDown(0.5);

doc
  .font('Helvetica')
  .fontSize(18)
  .fillColor(ACCENT)
  .text('A Comprehensive Cyber Weapon Analysis', { align: 'center' });

doc.moveDown(1);

doc
  .font('Helvetica')
  .fontSize(14)
  .fillColor('#cccccc')
  .text('The World\'s First Digital Weapon', { align: 'center' });

doc.moveDown(6);

// Divider line
doc
  .moveTo(150, doc.y)
  .lineTo(445, doc.y)
  .strokeColor(ACCENT)
  .lineWidth(1)
  .stroke();

doc.moveDown(1.5);

doc
  .font('Helvetica')
  .fontSize(12)
  .fillColor('#aaaaaa')
  .text('Cybersecurity Research Report', { align: 'center' });

doc.moveDown(0.5);

doc
  .font('Helvetica')
  .fontSize(12)
  .fillColor('#aaaaaa')
  .text('Author: Senan Adigozelov', { align: 'center' });

doc.moveDown(0.5);

doc
  .font('Helvetica')
  .fontSize(11)
  .fillColor('#888888')
  .text(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, { align: 'center' });

doc.moveDown(0.5);

doc
  .font('Helvetica')
  .fontSize(10)
  .fillColor('#666666')
  .text('Classification: PUBLIC', { align: 'center' });

// ============================================================
// TABLE OF CONTENTS
// ============================================================

doc.addPage();

addHeader('Table of Contents', 26);
doc.moveDown(0.5);

const tocItems = [
  { num: '1', title: 'Executive Summary', page: '3' },
  { num: '2', title: 'Introduction', page: '3' },
  { num: '3', title: 'Technical Architecture', page: '4' },
  { num: '3.1', title: 'Propagation Mechanisms', page: '4' },
  { num: '3.2', title: 'Zero-Day Exploits', page: '5' },
  { num: '3.3', title: 'Payload and SCADA Targeting', page: '5' },
  { num: '4', title: 'Attack Timeline', page: '6' },
  { num: '5', title: 'Attribution and Geopolitical Context', page: '7' },
  { num: '6', title: 'Impact Assessment', page: '7' },
  { num: '7', title: 'Defense and Mitigation Strategies', page: '8' },
  { num: '8', title: 'Legacy and Implications', page: '9' },
  { num: '9', title: 'Conclusion', page: '9' },
  { num: '10', title: 'References', page: '10' },
];

tocItems.forEach((item) => {
  const indent = item.num.includes('.') ? 30 : 0;
  const fontStyle = item.num.includes('.') ? 'Helvetica' : 'Helvetica-Bold';
  doc
    .font(fontStyle)
    .fontSize(12)
    .fillColor(TEXT_COLOR)
    .text(`${item.num}.  ${item.title}`, 60 + indent, doc.y, {
      continued: false,
      width: 400,
    });
  doc.moveDown(0.4);
});

// ============================================================
// SECTION 1: EXECUTIVE SUMMARY
// ============================================================

doc.addPage();

addHeader('1. Executive Summary');

addParagraph(
  'Stuxnet is widely regarded as the first true cyber weapon ever deployed in a real-world military operation. Discovered in June 2010, this highly sophisticated computer worm was specifically designed to target Supervisory Control and Data Acquisition (SCADA) systems manufactured by Siemens, with the primary objective of sabotaging Iran\'s nuclear enrichment program at the Natanz facility.'
);

addParagraph(
  'The worm exploited an unprecedented four zero-day vulnerabilities in Microsoft Windows, employed two stolen digital certificates for code signing, and demonstrated an extraordinary level of domain-specific knowledge about Siemens industrial control systems and uranium enrichment centrifuge operations. Its complexity and precision strongly suggest state-sponsored development, with extensive evidence pointing to a joint United States-Israel operation codenamed "Olympic Games."'
);

addInfoBox(
  'KEY FINDING: Stuxnet successfully destroyed approximately 1,000 of the 5,000 IR-1 centrifuges at the Natanz enrichment facility, setting back Iran\'s nuclear program by an estimated 1-2 years.'
);

addParagraph(
  'This report provides a comprehensive technical analysis of Stuxnet\'s architecture, propagation mechanisms, payload delivery, geopolitical context, and its lasting implications for international cybersecurity and the future of cyber warfare.'
);

// ============================================================
// SECTION 2: INTRODUCTION
// ============================================================

checkPageSpace(200);
addHeader('2. Introduction');

addParagraph(
  'In the landscape of cybersecurity, few events have been as transformative as the discovery of Stuxnet. Before its emergence, cyber attacks were primarily associated with data theft, financial fraud, and network disruption. Stuxnet fundamentally changed this paradigm by demonstrating that malicious software could cross the digital-physical boundary and cause tangible, kinetic damage to critical infrastructure.'
);

addParagraph(
  'The worm was first identified by VirusBlokAda, a Belarusian cybersecurity firm, in June 2010, although evidence suggests it had been operational since at least June 2009. Initial analysis revealed a piece of malware of unprecedented complexity -- approximately 500 kilobytes of compiled code, roughly 15,000 lines of source code, with multiple layers of encryption, anti-analysis techniques, and a deeply specialized payload.'
);

addParagraph(
  'Unlike conventional malware that seeks to maximize its spread and impact across diverse systems, Stuxnet was engineered with surgical precision. It was programmed to activate its destructive payload only when it identified a very specific configuration of Siemens S7-315 and S7-417 programmable logic controllers (PLCs) connected to particular models of variable-frequency drives operating at frequencies between 807 Hz and 1,210 Hz -- parameters consistent with uranium enrichment centrifuge cascades.'
);

addInfoBox(
  'CONTEXT: Iran\'s Natanz facility housed approximately 8,000 IR-1 centrifuges (based on the Pakistani P-1 design) used to enrich uranium hexafluoride (UF6) gas. The enrichment process requires centrifuges to spin at extremely precise speeds, making them vulnerable to even minor frequency manipulations.'
);

// ============================================================
// SECTION 3: TECHNICAL ARCHITECTURE
// ============================================================

doc.addPage();

addHeader('3. Technical Architecture');

addParagraph(
  'Stuxnet\'s technical architecture represents a masterclass in offensive software engineering. The worm consists of multiple interconnected components, each designed to perform specific functions including propagation, evasion, command and control communication, and payload delivery.'
);

// 3.1
addSubHeader('3.1 Propagation Mechanisms');

addParagraph(
  'Stuxnet employed multiple propagation vectors to ensure it could reach air-gapped networks (systems not connected to the internet). Its primary infection vectors included:'
);

addBullet('USB Drive Infection: Exploited the Windows Shell LNK vulnerability (CVE-2010-2568) to execute code automatically when a USB drive was viewed in Windows Explorer, even with AutoRun disabled.');
addBullet('Network Shares: Propagated through Windows network shares using legitimate credentials harvested from infected machines.');
addBullet('Siemens WinCC Database: Exploited a hardcoded password in the Siemens WinCC SQL Server database to inject and execute code on SCADA workstations.');
addBullet('Print Spooler Vulnerability: Used the Windows Print Spooler vulnerability (CVE-2010-2729) to spread to network printers and shared print servers.');
addBullet('Windows Server Service: Exploited the MS08-067 vulnerability (the same flaw used by Conficker) for remote code execution on unpatched systems.');
addBullet('Siemens Step 7 Project Files: Infected Siemens Step 7 project files (.S7P), ensuring that any engineer who opened an infected project would also become compromised.');

addParagraph(
  'The worm included a built-in counter that limited its propagation to three "hops" from each infected USB drive, demonstrating a deliberate effort to contain its spread and minimize collateral damage.'
);

// 3.2
checkPageSpace(200);
addSubHeader('3.2 Zero-Day Exploits');

addParagraph(
  'Stuxnet leveraged four previously unknown (zero-day) vulnerabilities in Microsoft Windows, an extraordinary number for a single piece of malware:'
);

addBullet('CVE-2010-2568 (Windows Shell LNK): Allowed code execution through specially crafted shortcut files. This was the primary USB propagation vector.');
addBullet('CVE-2010-2729 (Windows Print Spooler): Enabled remote code execution through shared printers on a network.');
addBullet('CVE-2010-3338 (Windows Task Scheduler): A privilege escalation vulnerability that allowed Stuxnet to gain SYSTEM-level access on Windows Vista and Windows 7.');
addBullet('CVE-2010-3888 (Windows Kernel): Another privilege escalation vulnerability used on older Windows versions (XP and Server 2003).');

addInfoBox(
  'SIGNIFICANCE: Zero-day vulnerabilities are extremely rare and valuable. A single zero-day can sell for $100,000 to $1,000,000+ on the open market. The use of four simultaneously indicates a well-funded operation with access to top-tier vulnerability research capabilities.'
);

// 3.3
checkPageSpace(200);
addSubHeader('3.3 Payload and SCADA Targeting');

addParagraph(
  'The true sophistication of Stuxnet lies in its payload -- the component designed to physically sabotage centrifuges. The payload targeted two specific Siemens PLCs:'
);

addSubHeader('Target 1: Siemens S7-315 PLC', 13);
addParagraph(
  'This component targeted the variable-frequency drives controlling centrifuge motor speed. Stuxnet would periodically alter the operating frequency of the drives:'
);
addBullet('Normal operation: ~1,064 Hz (corresponding to optimal centrifuge rotation speed)');
addBullet('Attack phase 1: Increase frequency to 1,410 Hz for 15 minutes');
addBullet('Attack phase 2: Drop frequency to 2 Hz for 50 minutes');
addBullet('Return to normal operation for 27 days before repeating the cycle');

addParagraph(
  'These rapid speed changes caused excessive mechanical stress on the centrifuge rotors, leading to premature failure through vibration damage, bearing wear, and structural fatigue.'
);

checkPageSpace(150);
addSubHeader('Target 2: Siemens S7-417 PLC', 13);
addParagraph(
  'This component targeted the cascade protection system -- the safety mechanisms designed to isolate faulty centrifuges. By manipulating valve states and pressure readings, Stuxnet prevented the automatic shutdown of damaged centrifuges, allowing the damage to propagate through the cascade.'
);

addParagraph(
  'Crucially, while the attack was in progress, Stuxnet performed a "man-in-the-middle" attack on the PLC. It recorded legitimate sensor readings during normal operation and replayed these recordings to the monitoring systems during the attack phase. This meant that operators watching their control screens would see perfectly normal readings while the centrifuges were being systematically destroyed.'
);

// ============================================================
// SECTION 4: ATTACK TIMELINE
// ============================================================

doc.addPage();

addHeader('4. Attack Timeline');

addParagraph(
  'Based on forensic analysis and subsequent investigations, the following timeline has been established:'
);

const timeline = [
  { date: '2005-2006', event: 'Development of Stuxnet begins (estimated). Initial reconnaissance and intelligence gathering on Natanz facility.' },
  { date: 'June 2009', event: 'Stuxnet version 0.5 (earlier variant using a different attack method targeting Siemens S7-417 PLCs) is believed to have been deployed.' },
  { date: 'January 2010', event: 'IAEA inspectors notice an unusually high rate of centrifuge failures at Natanz. Approximately 1,000 centrifuges are decommissioned.' },
  { date: 'March 2010', event: 'Stuxnet version 1.001 is compiled (based on PE timestamp analysis). This version adds the S7-315 attack code and additional propagation mechanisms.' },
  { date: 'June 2010', event: 'VirusBlokAda discovers Stuxnet while investigating system anomalies reported by an Iranian client. The malware is initially identified as a rootkit targeting Siemens WinCC systems.' },
  { date: 'July 2010', event: 'Microsoft releases emergency patch for the LNK vulnerability (CVE-2010-2568). Siemens releases a detection and removal tool for affected SCADA systems.' },
  { date: 'September 2010', event: 'Symantec publishes its landmark technical analysis "W32.Stuxnet Dossier," revealing the full scope and sophistication of the malware.' },
  { date: 'November 2010', event: 'Iran acknowledges that Stuxnet caused problems with its centrifuges. President Ahmadinejad states that a computer virus had created problems for "a limited number of our centrifuges."' },
  { date: 'June 2012', event: 'David Sanger of The New York Times reports on "Olympic Games," the classified US-Israel program behind Stuxnet, based on interviews with unnamed government officials.' },
];

timeline.forEach((item) => {
  checkPageSpace(80);
  doc
    .font('Helvetica-Bold')
    .fontSize(11)
    .fillColor(ACCENT)
    .text(item.date, { continued: true })
    .font('Helvetica')
    .fillColor(TEXT_COLOR)
    .text(`  --  ${item.event}`, { align: 'left', lineGap: 3 });
  doc.moveDown(0.5);
});

// ============================================================
// SECTION 5: ATTRIBUTION
// ============================================================

checkPageSpace(200);
addHeader('5. Attribution and Geopolitical Context');

addParagraph(
  'While no government has officially claimed responsibility for Stuxnet, substantial evidence points to a joint operation between the United States and Israel:'
);

addBullet('The level of resources required (estimated development cost: $1-10 million, with a team of 5-30 developers over several years) points to state sponsorship.');
addBullet('The malware contained references to dates significant in Israeli and Jewish history, including "19790509" (the date of execution of Habib Elghanian, a prominent Iranian Jewish businessman).');
addBullet('The operation required detailed intelligence about the Natanz facility\'s exact configuration, equipment models, and centrifuge operating parameters.');
addBullet('In 2012, The New York Times reported on "Olympic Games," describing it as a classified program initiated under President George W. Bush and continued under President Obama.');
addBullet('Retired CIA and NSA officials have made various public statements that indirectly confirmed US involvement.');
addBullet('Israel\'s Unit 8200 (signals intelligence unit) is widely believed to have played a major role in development and testing.');

addParagraph(
  'The geopolitical context was the international concern over Iran\'s nuclear program and the desire to delay its progress without resorting to conventional military strikes, which would have had severe diplomatic and humanitarian consequences.'
);

// ============================================================
// SECTION 6: IMPACT ASSESSMENT
// ============================================================

doc.addPage();

addHeader('6. Impact Assessment');

addSubHeader('6.1 Direct Impact on Iran\'s Nuclear Program');

addBullet('Approximately 1,000 of 5,000 IR-1 centrifuges at Natanz were destroyed.');
addBullet('Iran\'s enrichment capacity was reduced by an estimated 30% during the attack period.');
addBullet('The nuclear program was set back by an estimated 1-2 years.');
addBullet('Iran was forced to replace damaged centrifuges and implement new security measures.');
addBullet('Significant psychological impact on Iranian nuclear scientists and technicians who could not identify the cause of the failures.');

doc.moveDown(0.3);

addSubHeader('6.2 Broader Cybersecurity Impact');

addBullet('Demonstrated that cyber attacks could cause physical damage to critical infrastructure.');
addBullet('Triggered a global reassessment of industrial control system (ICS) security.');
addBullet('Led to the creation of ICS-CERT (Industrial Control Systems Cyber Emergency Response Team) and similar organizations worldwide.');
addBullet('Sparked an international debate about the legality and ethics of offensive cyber operations.');
addBullet('Accelerated the development of cyber defense capabilities in nations worldwide.');

doc.moveDown(0.3);

addSubHeader('6.3 Unintended Consequences');

addParagraph(
  'Stuxnet\'s escape from the Natanz facility into the broader internet (likely through an engineer\'s infected laptop) had several unintended consequences:'
);

addBullet('The malware was exposed to the cybersecurity research community, revealing advanced offensive techniques.');
addBullet('The source code became available for study and potential modification by other threat actors.');
addBullet('Several derivative malware variants emerged, including Duqu (2011), Flame (2012), and Gauss (2012), suggesting shared code or development teams.');
addBullet('Nations worldwide accelerated their own offensive cyber capabilities, contributing to a cyber arms race.');

// ============================================================
// SECTION 7: DEFENSE AND MITIGATION
// ============================================================

checkPageSpace(200);
addHeader('7. Defense and Mitigation Strategies');

addParagraph(
  'The lessons learned from Stuxnet have led to significant improvements in industrial control system security. Key defense strategies include:'
);

addSubHeader('7.1 Network Architecture', 13);
addBullet('Implement proper network segmentation between IT and OT (Operational Technology) networks.');
addBullet('Use unidirectional security gateways (data diodes) for air-gapped networks.');
addBullet('Deploy intrusion detection systems (IDS) specifically designed for industrial protocols.');
addBullet('Implement strict USB device policies and controls.');

doc.moveDown(0.3);

addSubHeader('7.2 System Hardening', 13);
addBullet('Keep all SCADA/ICS software and firmware updated with the latest security patches.');
addBullet('Remove or change all default passwords in industrial control systems.');
addBullet('Disable unnecessary services and ports on PLCs and SCADA workstations.');
addBullet('Implement application whitelisting on all SCADA workstations.');

doc.moveDown(0.3);

addSubHeader('7.3 Monitoring and Response', 13);
addBullet('Continuously monitor PLC program integrity and configuration changes.');
addBullet('Implement anomaly detection for process variables (temperatures, pressures, speeds).');
addBullet('Establish dedicated incident response procedures for ICS/SCADA environments.');
addBullet('Conduct regular security assessments and penetration testing of industrial systems.');

// ============================================================
// SECTION 8: LEGACY AND IMPLICATIONS
// ============================================================

doc.addPage();

addHeader('8. Legacy and Implications');

addParagraph(
  'Stuxnet\'s legacy extends far beyond the immediate damage it caused to Iran\'s nuclear program. It fundamentally altered the landscape of international security, cyberwarfare doctrine, and critical infrastructure protection.'
);

addSubHeader('8.1 Cyber as a Domain of Warfare');
addParagraph(
  'Stuxnet established cyberspace as a legitimate domain of military operations, alongside land, sea, air, and space. Following its discovery, nations around the world established dedicated cyber commands and developed offensive cyber capabilities. The United States elevated its Cyber Command (USCYBERCOM) to a unified combatant command in 2018, while countries like China, Russia, the UK, France, and many others significantly expanded their cyber warfare programs.'
);

addSubHeader('8.2 Legal and Ethical Implications');
addParagraph(
  'The deployment of Stuxnet raised profound legal questions about the applicability of international law to cyber operations. Key questions include: Does a cyber attack that causes physical damage constitute an "armed attack" under Article 51 of the UN Charter? How do the principles of proportionality and distinction apply in cyberspace? Can a state legally use a cyber weapon against another state\'s critical infrastructure without a declaration of war?'
);

addSubHeader('8.3 The Pandora\'s Box Effect');
addParagraph(
  'Many cybersecurity experts argue that Stuxnet "opened Pandora\'s box" by demonstrating the feasibility and effectiveness of cyber weapons against critical infrastructure. Since its discovery, there has been a marked increase in sophisticated attacks targeting industrial systems, including the 2015 and 2016 attacks on Ukraine\'s power grid (attributed to Russia), the TRITON/TRISIS malware targeting safety instrumented systems in 2017, and numerous ransomware attacks affecting critical infrastructure.'
);

// ============================================================
// SECTION 9: CONCLUSION
// ============================================================

checkPageSpace(200);
addHeader('9. Conclusion');

addParagraph(
  'Stuxnet represents a watershed moment in the history of both cybersecurity and international conflict. As the first known cyber weapon designed to cause physical damage to critical infrastructure, it demonstrated that the digital and physical worlds are inextricably linked and that vulnerabilities in one domain can have devastating consequences in the other.'
);

addParagraph(
  'The technical sophistication of Stuxnet -- its four zero-day exploits, stolen digital certificates, deep knowledge of industrial control systems, and surgical precision in targeting -- set a benchmark that few subsequent malware campaigns have matched. It showed that state-sponsored cyber operations can achieve strategic military objectives that might otherwise require conventional military force.'
);

addParagraph(
  'However, Stuxnet also serves as a cautionary tale. Its uncontrolled spread beyond the intended target, the revelation of advanced offensive techniques to the global cybersecurity community, and its contribution to an accelerating cyber arms race all demonstrate the unpredictable and potentially destabilizing consequences of deploying cyber weapons.'
);

addParagraph(
  'As our critical infrastructure becomes increasingly connected and digitized, the lessons of Stuxnet become more relevant with each passing year. The need for robust industrial cybersecurity, international norms governing state behavior in cyberspace, and resilient systems designed to withstand sophisticated attacks has never been greater.'
);

addInfoBox(
  'FINAL NOTE: The story of Stuxnet is not merely a historical case study. It is a harbinger of the future of conflict in an increasingly digital world. Understanding its technical mechanisms, strategic implications, and ethical dimensions is essential for anyone involved in cybersecurity, national security, or critical infrastructure protection.'
);

// ============================================================
// SECTION 10: REFERENCES
// ============================================================

doc.addPage();

addHeader('10. References');

const references = [
  'Langner, R. (2013). "To Kill a Centrifuge: A Technical Analysis of What Stuxnet\'s Creators Tried to Achieve." The Langner Group.',
  'Falliere, N., Murchu, L. O., & Chien, E. (2011). "W32.Stuxnet Dossier." Symantec Security Response.',
  'Zetter, K. (2014). "Countdown to Zero Day: Stuxnet and the Launch of the World\'s First Digital Weapon." Crown/Archetype.',
  'Sanger, D. (2012). "Obama Order Sped Up Wave of Cyberattacks Against Iran." The New York Times.',
  'Albright, D., Brannan, P., & Walrond, C. (2010). "Did Stuxnet Take Out 1,000 Centrifuges at the Natanz Enrichment Plant?" Institute for Science and International Security (ISIS).',
  'Kushner, D. (2013). "The Real Story of Stuxnet." IEEE Spectrum.',
  'Lindsay, J. R. (2013). "Stuxnet and the Limits of Cyber Warfare." Security Studies, 22(3), 365-404.',
  'Farwell, J. P., & Rohozinski, R. (2011). "Stuxnet and the Future of Cyber War." Survival, 53(1), 23-40.',
  'Rid, T. (2012). "Cyber War Will Not Take Place." Journal of Strategic Studies, 35(1), 5-32.',
  'ICS-CERT. (2010). "ICSA-10-272-01 -- Siemens SIMATIC WinCC and PCS 7." U.S. Department of Homeland Security.',
];

references.forEach((ref, index) => {
  checkPageSpace(60);
  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(TEXT_COLOR)
    .text(`[${index + 1}]  ${ref}`, { align: 'left', lineGap: 3, indent: 30 });
  doc.moveDown(0.4);
});

// ============================================================
// BACK COVER
// ============================================================

doc.addPage();

doc.rect(0, 0, 595, 842).fill(PRIMARY);

doc
  .font('Helvetica-Bold')
  .fontSize(24)
  .fillColor('#ffffff')
  .text('STUXNET', 60, 350, { align: 'center' });

doc.moveDown(0.5);

doc
  .font('Helvetica')
  .fontSize(14)
  .fillColor(ACCENT)
  .text('A Comprehensive Cyber Weapon Analysis', { align: 'center' });

doc.moveDown(2);

doc
  .font('Helvetica')
  .fontSize(11)
  .fillColor('#888888')
  .text('Prepared by Senan Adigozelov', { align: 'center' });

doc.moveDown(0.3);

doc
  .font('Helvetica')
  .fontSize(10)
  .fillColor('#666666')
  .text('Cybersecurity Research Report', { align: 'center' });

doc.moveDown(0.3);

doc
  .font('Helvetica')
  .fontSize(10)
  .fillColor('#666666')
  .text(`Published: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}`, { align: 'center' });

// Add page numbers (skip cover and back cover)
addPageNumber();

// Finalize
doc.end();

stream.on('finish', () => {
  console.log('PDF report generated successfully: reports/Stuxnet_Report.pdf');
});
