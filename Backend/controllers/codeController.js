const supabase = require("../supabase/Supabase_Connect");

const getAll = async (req, res) => {
  try {
    const { data: codes, error } = await supabase.from('codes').select('*');
  
    if (error) {
      throw new Error(error.message);
    }
  
    res.status(200).json(codes || []); // Return an empty array if codes is null
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOneCode = async (req, res) => {
  try {
    const { code } = req.params; // Assuming the code value is provided as a route parameter
  
    const { data: codes, error } = await supabase
      .from('codes')
      .select('*')
      .eq('code', code)
      .limit(1);
  
    if (error) {
      throw new Error(error.message);
    }
  
    res.status(200).json(codes && codes.length > 0 ? codes[0] : null); // Return the first code object if found, otherwise null
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCode = async (req, res) => {
  try {
    const { code } = req.params; // Assuming the code value is provided as a route parameter

    const { data, error } = await supabase
      .from('codes')
      .delete()
      .eq('code', code);

    if (error) {
      throw new Error(error.message);
    }

    if (data && data.length > 0) {
      res.status(200).json({ message: 'Code deleted successfully' });
    } else {
      res.status(404).json({ message: 'Code not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const confirmPurchase = async (req, res) => {
  const { userId } = req.params;
  const { code } = req.body;

  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('balance')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { data: codeData, error: codeError } = await supabase
      .from('codes')
      .select('points')
      .eq('code', code)
      .single();

    if (codeError || !codeData) {
      return res.status(404).json({ error: 'Code not found' });
    }

    const { points } = codeData;
    const updatedBalance = user.balance + points;

    await supabase
      .from('users')
      .update({ balance: updatedBalance })
      .eq('id', userId);

    return res.json({ balance: updatedBalance });
  } catch (error) {
    console.error('Error confirming purchase:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAll, getOneCode, deleteCode, confirmPurchase };

