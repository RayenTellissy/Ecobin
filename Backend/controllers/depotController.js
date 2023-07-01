require("dotenv").config()
const supabase = require("../supabase/Supabase_Connect")


const depotController = {

  getAllDepots: async (req ,res) => {
    try { const { data: depots, error } = await supabase.from('depot').select('*');
    if (error) {throw new Error(error.message);}
    res.status(200).json(depots || [])} catch (error) {
   res.status(500).json({ error: error.message });}} ,

/////
  getDepotById: async (req,res) => {const { id } = req.params;
 try { const feed = await supabase.from('depot').select('*').eq('id', id).single();
  if (feed.error) {throw new Error(feed.error.message);}
  res.status(200).json([feed])} catch (error) {
  res.status(500).json({ error: error.message });}},

/////
  searchDepot: async (req, res)=> {
    const { query } = req.query;
    try { const depotsByName = await supabase.from('depot').select('*').ilike('name', `%${query}%`);
      // Search by state name
    const depotsByState = await supabase.from('depot').select('*').ilike('state', `%${query}%`);
    const depots = [...(depotsByName.data || []),...(depotsByState.data || []), ];
    res.status(200).json(depots);} catch (error) {
    console.error('Error retrieving depots:', error.message);
    res.status(500).json({ error: 'Failed to retrieve depots' });}} ,
////

getDepotItems  : async  (depotId)=> {
  try {  const { data: depotData, error: depotError } = await supabase.from("depot")
  .select("items").eq("id", depotId).single();
    if (depotError) { throw depotError;}
    const { data: itemsData, error: itemsError } = await supabase.from("items")
     .select().in("id", depotData.items).order("id", { ascending: true });
    if (itemsError) {throw itemsError;  }
return itemsData; }
 catch (error) {console.error("Error retrieving items for depot:", error);
    throw error;}
}
    } 
     

module.exports = depotController
