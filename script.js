const rates = {
    generation: 5.5,
    transmission: 1.2,
    distribution: 1.5,
    systemLoss: 0.8,
    otherCharges: 0.5,
    vatRate: 0.12,
    franchiseTaxRate: 0.03,
    universalCharge: 0.2,
  };

  function updateDarkModeIcon() {
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('darkIcon').style.display = isDark ? '' : 'none';
    document.getElementById('lightIcon').style.display = isDark ? 'none' : '';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    updateDarkModeIcon();
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    updateDarkModeIcon();
  }

  function getEffectiveRate(includeFranchiseTax) {
    // Base rate components including Universal Charge
    const baseRate = rates.generation + rates.transmission + rates.distribution + 
                    rates.systemLoss + rates.otherCharges + (rates.universalCharge || 0);
    
    // Calculate franchise tax first (if included)
    const franchiseTax = includeFranchiseTax ? baseRate * rates.franchiseTaxRate : 0;
    
    // Calculate VAT on the total including franchise tax
    const subtotal = baseRate + franchiseTax;
    const vat = subtotal * rates.vatRate;
    
    // Return total rate including all components
    return subtotal + vat;
  }

  function calculateBill() {
    const kWhInput = document.getElementById('kWh');
    const kWh = parseFloat(kWhInput.value);
    const includeTax = document.getElementById('includeTax').checked;

    if (isNaN(kWh) || kWh <= 0) {
      kWhInput.focus();
      return alert('Please enter a valid number greater than 0 for kWh.');
    }

    const rate = getEffectiveRate(includeTax);
    const total = kWh * rate;

    document.getElementById('billResult').innerText = `Total Bill: ₱${total.toFixed(2)}\nRate per kWh: ₱${rate.toFixed(2)}`;
  }

  function toggleMultiplierInput() {
    const duration = document.getElementById('duration').value;
    const multiplierContainer = document.getElementById('multiplierContainer');
    multiplierContainer.classList.toggle('hidden', duration === 'hour');
  }

  function toggleInputType() {
    const inputType = document.getElementById('inputType').value;
    document.getElementById('wattageGroup').classList.toggle('hidden', inputType === 'kwh');
    document.getElementById('kwhGroup').classList.toggle('hidden', inputType === 'watt');
  }

  // Updated Philippine appliance data by category (based on Meralco Appliance Calculator)
  const applianceData = {
    'Air Conditioners': [
      { name: 'Aircon, Window Type, 0.5 HP', watt: 500 },
      { name: 'Aircon, Window Type, 1.0 HP', watt: 900 },
      { name: 'Aircon, Window Type, 1.5 HP', watt: 1200 },
      { name: 'Aircon, Window Type, 2.0 HP', watt: 1800 },
      { name: 'Aircon, Split Type, 1.0 HP', watt: 900 },
      { name: 'Aircon, Split Type, 1.5 HP', watt: 1200 },
      { name: 'Aircon, Split Type, 2.0 HP', watt: 1800 },
      { name: 'Aircon, Inverter, 1.0 HP', watt: 700 },
      { name: 'Aircon, Inverter, 1.5 HP', watt: 1100 },
      { name: 'Aircon, Inverter, 2.0 HP', watt: 1500 },
      { name: 'Carrier Optima Window Type 0.5 HP', watt: 500 },
      { name: 'Panasonic CW-N920JPH Window Type 1.0 HP', watt: 900 },
      { name: 'LG LA100EC Split Type 1.0 HP', watt: 900 },
      { name: 'Samsung AR09TYHYEWKNTC Inverter Split Type 1.0 HP', watt: 700 },
      { name: 'Condura WCONH009EE Window Type 1.0 HP', watt: 900 },
      { name: 'Daikin FTKC25QVM Inverter Split Type 1.0 HP', watt: 700 }
    ],
    'Refrigerators': [
      { name: 'Refrigerator, Single Door, 5 cu.ft.', watt: 80 },
      { name: 'Refrigerator, Single Door, 7 cu.ft.', watt: 100 },
      { name: 'Refrigerator, Two Door, 7 cu.ft.', watt: 120 },
      { name: 'Refrigerator, Two Door, 8 cu.ft.', watt: 130 },
      { name: 'Refrigerator, Inverter, 8 cu.ft.', watt: 100 },
      { name: 'Refrigerator, Inverter, 10 cu.ft.', watt: 120 },
      { name: 'Chest Freezer, 5 cu.ft.', watt: 120 },
      { name: 'Chest Freezer, 7 cu.ft.', watt: 150 },
      { name: 'Sharp SJ-ML50AS-SL Single Door 5 cu.ft.', watt: 80 },
      { name: 'Panasonic NR-BP260VD Two Door 9 cu.ft.', watt: 120 },
      { name: 'Samsung RT20FARVDSA Inverter 7.4 cu.ft.', watt: 100 },
      { name: 'LG GR-B202SQBB Inverter 7.0 cu.ft.', watt: 100 },
      { name: 'Haier HRF-IV230VN Inverter 8.1 cu.ft.', watt: 120 }
    ],
    'Audio and Video': [
      { name: 'LED TV, 24-inch', watt: 40 },
      { name: 'LED TV, 32-inch', watt: 50 },
      { name: 'LED TV, 43-inch', watt: 75 },
      { name: 'CRT TV, 21-inch', watt: 70 },
      { name: 'Home Theater System', watt: 200 },
      { name: 'Karaoke Machine', watt: 100 },
      { name: 'Samsung UA32T4300 LED TV 32-inch', watt: 50 },
      { name: 'Sony Bravia KDL-43W660F LED TV 43-inch', watt: 75 },
      { name: 'LG LK50 24-inch LED TV', watt: 40 },
      { name: 'Devant 50UHD201 LED TV 50-inch', watt: 110 },
      { name: 'TCL 32S65A LED TV 32-inch', watt: 50 }
    ],
    'Computers and Gadgets': [
      { name: 'Desktop Computer', watt: 200 },
      { name: 'Laptop', watt: 50 },
      { name: 'WiFi Router', watt: 10 },
      { name: 'Printer', watt: 30 },
      { name: 'Tablet/Phone Charger', watt: 10 },
      { name: 'Acer Aspire TC-885 Desktop', watt: 200 },
      { name: 'HP Pavilion x360 Laptop', watt: 50 },
      { name: 'PLDT Home Fibr WiFi Router', watt: 10 },
      { name: 'Canon PIXMA G3010 Printer', watt: 30 },
      { name: 'Samsung Galaxy Tab A Charger', watt: 10 }
    ],
    'Fans': [
      { name: 'Stand Fan', watt: 60 },
      { name: 'Ceiling Fan', watt: 75 },
      { name: 'Desk Fan', watt: 45 },
      { name: 'Exhaust Fan', watt: 35 },
      { name: 'Asahi Stand Fan 16-inch', watt: 60 },
      { name: 'Hanabishi Ceiling Fan 16-inch', watt: 75 },
      { name: 'Dowell Desk Fan 12-inch', watt: 45 },
      { name: 'Imarflex IF-325 Exhaust Fan', watt: 35 }
    ],
    'Freezers': [
      { name: 'Chest Freezer, 5 cu.ft.', watt: 120 },
      { name: 'Chest Freezer, 7 cu.ft.', watt: 150 },
      { name: 'Upright Freezer', watt: 180 },
      { name: 'Fujidenzo SU-50A Chest Freezer 5 cu.ft.', watt: 120 },
      { name: 'Sharp FRV-150 Upright Freezer', watt: 180 },
      { name: 'Condura CCF150Ri Chest Freezer 7 cu.ft.', watt: 150 }
    ],
    'General Appliances': [
      { name: 'Iron', watt: 1000 },
      { name: 'Vacuum Cleaner', watt: 800 },
      { name: 'Sewing Machine', watt: 70 },
      { name: 'Water Dispenser', watt: 100 },
      { name: 'Air Purifier', watt: 50 },
      { name: 'Philips GC5039 Steam Iron', watt: 1000 },
      { name: 'Dyson V8 Vacuum Cleaner', watt: 800 },
      { name: 'Brother JA1450NT Sewing Machine', watt: 70 },
      { name: 'Hanabishi HWD-210 Water Dispenser', watt: 100 },
      { name: 'Xiaomi Mi Air Purifier 3H', watt: 50 }
    ],
    'Kitchen Appliances': [
      { name: 'Rice Cooker, 1.0L', watt: 400 },
      { name: 'Rice Cooker, 1.8L', watt: 700 },
      { name: 'Electric Kettle', watt: 1200 },
      { name: 'Microwave Oven', watt: 1000 },
      { name: 'Blender', watt: 350 },
      { name: 'Toaster', watt: 800 },
      { name: 'Coffee Maker', watt: 800 },
      { name: 'Induction Cooker', watt: 1200 },
      { name: 'Oven Toaster', watt: 800 },
      { name: 'Slow Cooker', watt: 250 },
      { name: 'Imarflex IRC-1500S Rice Cooker 1.5L', watt: 700 },
      { name: 'Hanabishi HWK-112 Electric Kettle', watt: 1200 },
      { name: 'Sharp R-20A0 Microwave Oven', watt: 1000 },
      { name: 'Oster 10-Speed Blender', watt: 350 },
      { name: 'Kyowa KW-3815 Toaster', watt: 800 },
      { name: 'Black+Decker CM0910 Coffee Maker', watt: 800 },
      { name: 'Philips HD4921 Induction Cooker', watt: 1200 },
      { name: 'Imarflex IS-150S Slow Cooker', watt: 250 }
    ],
    'Lighting': [
      { name: 'LED Bulb, 5W', watt: 5 },
      { name: 'LED Bulb, 9W', watt: 9 },
      { name: 'LED Bulb, 12W', watt: 12 },
      { name: 'Fluorescent Lamp, 20W', watt: 20 },
      { name: 'Fluorescent Lamp, 40W', watt: 40 },
      { name: 'CFL Bulb, 11W', watt: 11 },
      { name: 'CFL Bulb, 15W', watt: 15 },
      { name: 'Philips LED Bulb 9W', watt: 9 },
      { name: 'Firefly LED Bulb 12W', watt: 12 },
      { name: 'Omni CFL Bulb 15W', watt: 15 },
      { name: 'Akari LED Bulb 5W', watt: 5 },
      { name: 'Panasonic Fluorescent Lamp 20W', watt: 20 },
      { name: 'Panasonic Fluorescent Lamp 40W', watt: 40 }
    ],
    'Washers and Dryers': [
      { name: 'Washing Machine, Twin Tub', watt: 350 },
      { name: 'Washing Machine, Fully Auto', watt: 500 },
      { name: 'Washing Machine, Inverter', watt: 250 },
      { name: 'Clothes Dryer', watt: 2000 },
      { name: 'Sharp ES-8535T Twin Tub', watt: 350 },
      { name: 'LG T2108VS2W Fully Auto', watt: 500 },
      { name: 'Whirlpool AWD72AWP Dryer', watt: 2000 },
      { name: 'Samsung WA70H4000SG Inverter', watt: 250 }
    ],
    'Others': [
      { name: 'Air Purifier', watt: 50 },
      { name: 'Dehumidifier', watt: 200 },
      { name: 'Electric Fan', watt: 60 },
      { name: 'Water Pump', watt: 370 },
      { name: 'Personal Refrigerator', watt: 60 },
      { name: 'Xiaomi Mi Air Purifier 3H', watt: 50 },
      { name: 'Dowell DH-610 Dehumidifier', watt: 200 },
      { name: 'Asahi Electric Fan', watt: 60 },
      { name: 'DAB Jet 132M Water Pump', watt: 370 },
      { name: 'Midea Personal Refrigerator', watt: 60 }
    ]
  };

  function onCategoryChange() {
    const category = document.getElementById('applianceCategory').value;
    const dropdown = document.getElementById('applianceNameDropdown');
    const label = document.getElementById('applianceNameDropdownLabel');
    const customInput = document.getElementById('customApplianceName');
    dropdown.innerHTML = '';
    dropdown.style.display = 'none';
    label.style.display = 'none';
    customInput.style.display = 'none';
    if (category === 'all' || !applianceData[category]) {
      return;
    }
    label.style.display = '';
    dropdown.style.display = '';
    // Add default option
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = 'Select Appliance';
    dropdown.appendChild(defaultOpt);
    // Add appliances
    applianceData[category].forEach(app => {
      const opt = document.createElement('option');
      opt.value = app.name;
      opt.textContent = app.name;
      opt.setAttribute('data-watt', app.watt);
      dropdown.appendChild(opt);
    });
    // Add custom option
    const customOpt = document.createElement('option');
    customOpt.value = '__custom__';
    customOpt.textContent = 'Custom';
    dropdown.appendChild(customOpt);
  }

  function onApplianceChange() {
    const dropdown = document.getElementById('applianceNameDropdown');
    const customInput = document.getElementById('customApplianceName');
    const selected = dropdown.value;
    const wattageInput = document.getElementById('wattage');
    const inputType = document.getElementById('inputType').value;
    const hoursInput = document.getElementById('hours');
    const kwhInput = document.getElementById('energyUsed');
    if (selected === '__custom__') {
      customInput.style.display = '';
      wattageInput.value = '';
      if (inputType === 'kwh') kwhInput.value = '';
    } else {
      customInput.style.display = 'none';
      const selectedOption = dropdown.options[dropdown.selectedIndex];
      const watt = selectedOption.getAttribute('data-watt');
      if (watt) {
        wattageInput.value = watt;
        // Auto-calculate kWh if input type is kWh and hours is set
        if (inputType === 'kwh' && hoursInput.value) {
          kwhInput.value = ((parseFloat(watt) * parseFloat(hoursInput.value)) / 1000).toFixed(2);
        }
      } else {
        wattageInput.value = '';
        if (inputType === 'kwh') kwhInput.value = '';
      }
    }
  }

  // Also update kWh when hours or wattage changes and inputType is kWh
  ['hours', 'wattage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function() {
        const inputType = document.getElementById('inputType').value;
        if (inputType === 'kwh') {
          const watt = parseFloat(document.getElementById('wattage').value);
          const hours = parseFloat(document.getElementById('hours').value);
          if (!isNaN(watt) && !isNaN(hours)) {
            document.getElementById('energyUsed').value = ((watt * hours) / 1000).toFixed(2);
          }
        }
      });
    }
  });

  function calculateApplianceCost() {
    const category = document.getElementById('applianceCategory').value;
    let applianceName = '';
    const applianceNameInput = document.getElementById('applianceName').value.trim();
    if (applianceNameInput) {
      applianceName = applianceNameInput;
    } else if (category !== 'all' && applianceData[category]) {
      const applianceDropdown = document.getElementById('applianceNameDropdown');
      const selectedAppliance = applianceDropdown.value;
      if (!selectedAppliance) {
        alert('Please select an appliance or enter a custom name.');
        return;
      }
      if (selectedAppliance === '__custom__') {
        applianceName = document.getElementById('customApplianceName').value.trim();
        if (!applianceName) {
          alert('Please enter a custom appliance name.');
          return;
        }
      } else {
        applianceName = selectedAppliance;
      }
    } else if (!applianceNameInput) {
      alert('Please enter the appliance name.');
      return;
    }
    const inputType = document.getElementById('inputType').value;
    const duration = document.getElementById('duration').value;
    const includeTax = document.getElementById('applianceTax').checked;

    let totalUsage = 0;
    let durationText = '';
    let multiplier = 1;
    let kWhPerDay = 0;

    if (duration !== 'hour') {
      const multiplierInput = document.getElementById('multiplier');
      multiplier = parseFloat(multiplierInput.value);
      if (isNaN(multiplier) || multiplier <= 0) {
        multiplierInput.focus();
        return alert('Please enter a valid number of days/weeks/months.');
      }
    }

    if (inputType === 'watt') {
      const wattageInput = document.getElementById('wattage');
      const hoursInput = document.getElementById('hours');
      const wattage = parseFloat(wattageInput.value);
      const hours = parseFloat(hoursInput.value);
      if (isNaN(wattage) || wattage <= 0) {
        wattageInput.focus();
        return alert('Please enter a valid wattage greater than 0.');
      }
      if (isNaN(hours) || hours <= 0) {
        hoursInput.focus();
        return alert('Please enter valid hours greater than 0.');
      }
      kWhPerDay = (wattage * hours) / 1000;
      switch (duration) {
        case 'hour':
          totalUsage = (wattage * hours) / 1000;
          durationText = hours === 1 ? '1 hour' : `${hours} hours`;
          break;
        case 'day':
          totalUsage = kWhPerDay * multiplier;
          durationText = multiplier === 1 ? '1 day' : `${multiplier} days`;
          break;
        case 'week':
          totalUsage = kWhPerDay * 7 * multiplier;
          durationText = multiplier === 1 ? '1 week' : `${multiplier} weeks`;
          break;
        case 'month':
          totalUsage = kWhPerDay * 30 * multiplier;
          durationText = multiplier === 1 ? '1 month' : `${multiplier} months`;
          break;
        default:
          return alert('Invalid duration selected.');
      }
    } else if (inputType === 'kwh') {
      const energyInput = document.getElementById('energyUsed');
      const energyUsed = parseFloat(energyInput.value);
      if (isNaN(energyUsed) || energyUsed <= 0) {
        energyInput.focus();
        return alert('Please enter a valid energy used value greater than 0.');
      }
      switch (duration) {
        case 'hour':
          totalUsage = energyUsed;
          durationText = '1 hour';
          break;
        case 'day':
          totalUsage = energyUsed * multiplier;
          durationText = multiplier === 1 ? '1 day' : `${multiplier} days`;
          break;
        case 'week':
          totalUsage = energyUsed * 7 * multiplier;
          durationText = multiplier === 1 ? '1 week' : `${multiplier} weeks`;
          break;
        case 'month':
          totalUsage = energyUsed * 30 * multiplier;
          durationText = multiplier === 1 ? '1 month' : `${multiplier} months`;
          break;
        default:
          return alert('Invalid duration selected.');
      }
    } else {
      return alert('Invalid input type selected.');
    }

    const rate = getEffectiveRate(includeTax);
    const totalCost = totalUsage * rate;

    let dailyAverage = '';
    if (duration !== 'hour' && duration !== 'day') {
      const daysInPeriod = duration === 'week' ? 7 * multiplier : 30 * multiplier;
      dailyAverage = `\nDaily Average: ${(totalUsage / daysInPeriod).toFixed(2)} kWh (₱${((totalCost / daysInPeriod)).toFixed(2)})`;
    }

    const resultText = `Appliance: ${applianceName}
Duration: ${durationText}
Energy Used: ${totalUsage.toFixed(2)} kWh
Rate per kWh: ₱${rate.toFixed(2)}
Total Cost: ₱${totalCost.toFixed(2)}${dailyAverage}
${includeTax ? '(Includes 3% Franchise Tax)' : ''}`;

    document.getElementById('applianceResult').innerText = resultText;

    // Add result to the cost list
    addToCostList(resultText);
  }

  function addToCostList(resultText) {
    // Parse the resultText to extract values
    const applianceMatch = resultText.match(/Appliance:\s*(.*)/);
    const durationMatch = resultText.match(/Duration:\s*(.*)/);
    const energyMatch = resultText.match(/Energy Used:\s*([\d\.]+)/);
    const rateMatch = resultText.match(/Rate per kWh:\s*₱([\d\.]+)/);
    const totalMatch = resultText.match(/Total Cost:\s*₱([\d\.]+)/);
    const franchiseTax = /Includes 3% Franchise Tax/.test(resultText) ? 'Yes' : 'No';

    const appliance = applianceMatch ? applianceMatch[1] : '';
    const duration = durationMatch ? durationMatch[1] : '';
    const energy = energyMatch ? energyMatch[1] : '';
    const rate = rateMatch ? `₱${rateMatch[1]}` : '';
    const total = totalMatch ? `₱${totalMatch[1]}` : '';

    const table = document.getElementById('costListTable').querySelector('tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${appliance}</td>
      <td>${duration}</td>
      <td>${energy}</td>
      <td>${rate}</td>
      <td>${total}</td>
      <td>${franchiseTax}</td>
      <td><button class="remove-row-btn" title="Remove this entry">&times;</button></td>
    `;
    // Add event listener to the remove button
    tr.querySelector('.remove-row-btn').addEventListener('click', function() {
      tr.remove();
      updateTotalCost();
      saveCostListToStorage();
    });
    table.appendChild(tr);
    updateTotalCost();
    saveCostListToStorage();
  }

  function updateTotalCost() {
    const table = document.getElementById('costListTable').querySelector('tbody');
    const rows = table.querySelectorAll('tr');
    let totalCost = 0;
    let totalEnergy = 0;

    // Remove any existing total rows before calculation
    const existingTotalCostRow = document.getElementById('totalCostRow');
    if (existingTotalCostRow) existingTotalCostRow.remove();
    const existingTotalEnergyRow = document.getElementById('totalEnergyRow');
    if (existingTotalEnergyRow) existingTotalEnergyRow.remove();

    rows.forEach(row => {
        if (row.id === 'totalCostRow' || row.id === 'totalEnergyRow') return;
        const costCell = row.querySelector('td:nth-child(5)');
        const energyCell = row.querySelector('td:nth-child(3)');
        if (costCell) {
            const costText = costCell.textContent.replace('₱', '');
            totalCost += parseFloat(costText) || 0;
        }
        if (energyCell) {
            totalEnergy += parseFloat(energyCell.textContent) || 0;
        }
    });

    // Create and append a single centered total row
    let totalRow = document.createElement('tr');
    totalRow.id = 'totalCostRow';
    totalRow.innerHTML = `
        <td colspan="7" style="text-align: center; font-weight: bold; font-size: 1.1em;">
            Total Energy Used: <span style='font-weight: bold;'>${totalEnergy.toFixed(2)} kWh</span> &nbsp; | &nbsp; Total Cost: <span style='font-weight: bold;'>₱${totalCost.toFixed(2)}</span>
        </td>
    `;
    table.appendChild(totalRow);
  }

  function clearCostTable() {
    const table = document.getElementById('costListTable').querySelector('tbody');
    table.innerHTML = '';
    updateTotalCost();
    saveCostListToStorage();
  }

  async function exportCostListPDF() {
    try {
      const listSection = document.querySelector('.cost-list-section');
      if (!listSection) {
        alert('No list to export.');
        return;
      }
      const exportBtn = document.querySelector('.export-list-btn');
      if (exportBtn) {
        exportBtn.textContent = 'Generating PDF...';
        exportBtn.disabled = true;
      }
      const canvas = await html2canvas(listSection, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth - 20;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
      pdf.save('calculated-cost-list.pdf');
      if (exportBtn) {
        exportBtn.textContent = 'Export List as PDF';
        exportBtn.disabled = false;
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
      const exportBtn = document.querySelector('.export-list-btn');
      if (exportBtn) {
        exportBtn.textContent = 'Export List as PDF';
        exportBtn.disabled = false;
      }
    }
  }

  function resetFields() {
    document.getElementById('applianceName').value = '';
    document.getElementById('wattage').value = '';
    document.getElementById('hours').value = '';
    document.getElementById('duration').value = 'hour';
    document.getElementById('multiplier').value = '';
    document.getElementById('applianceTax').checked = false;
    document.getElementById('multiplierContainer').classList.add('hidden');
    document.getElementById('applianceResult').innerText = '';
    localStorage.removeItem('formData');
    clearCostTable();
  }

  function saveCostListToStorage() {
    const table = document.getElementById('costListTable').querySelector('tbody');
    const rows = Array.from(table.querySelectorAll('tr')).filter(row => row.id !== 'totalCostRow');
    const data = rows.map(row => {
        const cells = row.querySelectorAll('td');
        return {
            appliance: cells[0]?.textContent || '',
            duration: cells[1]?.textContent || '',
            energy: cells[2]?.textContent || '',
            rate: cells[3]?.textContent || '',
            total: cells[4]?.textContent || '',
            franchiseTax: cells[5]?.textContent || ''
        };
    });
    localStorage.setItem('costList', JSON.stringify(data));
  }

  function loadCostListFromStorage() {
    const data = JSON.parse(localStorage.getItem('costList') || '[]');
    const costListTable = document.getElementById('costListTable');
    if (!costListTable) return; // Prevent error if not on main page
    const table = costListTable.querySelector('tbody');
    table.innerHTML = '';
    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.appliance}</td>
          <td>${item.duration}</td>
          <td>${item.energy}</td>
          <td>${item.rate}</td>
          <td>${item.total}</td>
          <td>${item.franchiseTax}</td>
          <td><button class="remove-row-btn" title="Remove this entry">&times;</button></td>
        `;
        tr.querySelector('.remove-row-btn').addEventListener('click', function() {
            tr.remove();
            updateTotalCost();
            saveCostListToStorage();
        });
        table.appendChild(tr);
    });
    updateTotalCost();
  }

  function saveFormToStorage() {
    const formData = {
        applianceCategory: document.getElementById('applianceCategory').value,
        applianceName: document.getElementById('applianceName').value,
        inputType: document.getElementById('inputType').value,
        wattage: document.getElementById('wattage').value,
        hours: document.getElementById('hours').value,
        energyUsed: document.getElementById('energyUsed').value,
        duration: document.getElementById('duration').value,
        multiplier: document.getElementById('multiplier').value,
        applianceTax: document.getElementById('applianceTax').checked
    };
    localStorage.setItem('formData', JSON.stringify(formData));
  }

  function loadFormFromStorage() {
    const formData = JSON.parse(localStorage.getItem('formData') || '{}');
    document.getElementById('applianceCategory').value = formData.applianceCategory || '';
    document.getElementById('applianceName').value = formData.applianceName || '';
    document.getElementById('inputType').value = formData.inputType || 'watt';
    document.getElementById('wattage').value = formData.wattage || '';
    document.getElementById('hours').value = formData.hours || '';
    document.getElementById('energyUsed').value = formData.energyUsed || '';
    document.getElementById('duration').value = formData.duration || 'hour';
    document.getElementById('multiplier').value = formData.multiplier || '';
    document.getElementById('applianceTax').checked = !!formData.applianceTax;
    toggleInputType();
    toggleMultiplierInput();
  }

  // Save form data on input change
  ['applianceCategory','applianceName','inputType','wattage','hours','energyUsed','duration','multiplier','applianceTax'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('input', saveFormToStorage);
        el.addEventListener('change', saveFormToStorage);
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    applySavedTheme();
    loadCostListFromStorage();
    loadFormFromStorage();
    document.querySelectorAll('.dark-mode-btn, .logout-btn').forEach(btn => {
      btn.addEventListener('mouseup', function() {
        this.blur();
      });
    });
  });